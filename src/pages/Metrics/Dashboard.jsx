"use client";

import { useEffect, useState } from "react";
import api from "@/config/api"; // ✅ your axios instance with JWT interceptor
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch metrics with JWT
  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await api.get("/api/metrics");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching metrics", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Memory Usage"
          value={`${metrics.memory.used} MB`}
          extra={`${metrics.memory.free} MB free`}
          percent={metrics.memory.percentUsed}
        />
        <MetricCard
          title="CPU Load"
          value={`${metrics.cpu.load}%`}
          extra={`Cores: ${metrics.cpu.cores}`}
          percent={metrics.cpu.load}
        />
        <MetricCard
          title="Database"
          value={metrics.db.status}
          extra={`Connections: ${metrics.db.connections}`}
          percent={metrics.db.percentUsage}
        />
        <MetricCard
          title="Uptime"
          value={metrics.system.uptime}
          extra="hh:mm:ss"
          percent={100}
        />
      </div> */}

      {/* HTTP Requests Chart */}
      {/* <Card>
        <CardHeader>HTTP Requests</CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.http.requests}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="errors"
                  stroke="#dc2626"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}

// Reusable Metric Card with smooth updates
function MetricCard({ title, value, extra, percent }) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.p
            key={value}
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
        <p className="text-sm text-muted-foreground">{extra}</p>
        <Progress value={percent} className="mt-2" />
      </CardContent>
    </Card>
  );
}
