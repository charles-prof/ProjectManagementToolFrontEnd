import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from './CreateCommentForm'
import CommentCard from './CommentCard'
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

function IssueDetails() {

    const { issueId } = useParams()
    const dispatch = useDispatch()

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({ id: issueId, status }))
    }

    useEffect(() => {
        dispatch(fetchIssueById(issueId))
        dispatch(fetchComments(issueId))
    }, [issueId])

    const issueDetails = useSelector((state) => state.issue.issueDetails);
    const comments = useSelector((state) => state.comment.comments);

    return (
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border p-10 rounded-lg">
                <ScrollArea className="h-[80vh] w-[60%]">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-400">{issueDetails?.title}</h1>
                        <div className="py-5">
                            <h2 className="font-semibold text-gray-400"> Description </h2>
                            <p className="text-gray-400 text-sm mt-3"> {issueDetails?.description} </p>
                        </div>
                        <div className="mt-5">
                            <h1 className="pb-3"> Activity </h1>
                            <Tabs>
                                <TabsList>
                                    <TabsTrigger value="all">
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger value="comments">
                                        Comments
                                    </TabsTrigger>
                                    <TabsTrigger value="history">
                                        History
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="all">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </TabsContent>
                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />
                                    <div className="mt-8 spacey-6">
                                        {comments.map((item) => <CommentCard item={item} key={item.id} />)}
                                    </div>
                                </TabsContent>
                                <TabsContent value="history">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </ScrollArea>
                <div className="w-full lg:w-[30%] space-y-2">
                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="border rounded-lg">
                        <p className="border-b py-3 px-5">Details</p>
                        <div className="p-5">
                            <div className="space-y-7">
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]"> Assignee </p>
                                    {issueDetails?.assignee?.fullName ?
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 text-xs">
                                                <AvatarFallback>
                                                    {issueDetails?.assignee?.fullName[0]?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p> {issueDetails?.assignee?.fullName} </p>
                                        </div> : <p> unassigned </p>
                                    }

                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]"> Labels </p>
                                    <p> None</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]"> Status </p>
                                    <Badge>
                                        {issueDetails?.status}
                                    </Badge>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]"> Realese </p>
                                    <p>10-04-2025</p>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="w-[7rem]"> Reported </p>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 text-xs">
                                            <AvatarFallback>
                                                R
                                            </AvatarFallback>
                                        </Avatar>
                                        <p>Ram</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IssueDetails;
