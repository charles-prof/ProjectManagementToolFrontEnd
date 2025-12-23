import {
    Form,
    FormField,
    FormMessage,
    FormControl,
    FormItem
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ get auth state from redux
    const { jwt, user, loading, error } = useSelector((store) => store.auth);

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data) => {
        dispatch(login(data));   // call redux action
    }

    // ✅ redirect if already logged in
    useEffect(() => {
        if (jwt) {
            navigate("/");   // change to your home page route
        }
    }, [jwt, navigate]);

    return (
        <div className="space-y-5">
            <h1 className="title">Login</h1>
            {error && error.response?.status === 403 && (
                <div className="flex flex-col items-center justify-center p-3 border border-red-400 bg-red-100 rounded-md text-red-600 gap-2">
                    <p className="font-semibold">Invalid email or password</p>
                    <div className="flex items-center gap-2 text-sm text-red-700">
                        <span>Forgot your password?</span>
                        <Button
                            variant="link"
                            onClick={() => navigate("/forgot-password")}
                            className="p-0 h-auto font-bold underline"
                        >
                            Reset it here
                        </Button>
                    </div>
                </div>
            )}
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="User Email ... "
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Password ... "
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full ml-2"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Login
