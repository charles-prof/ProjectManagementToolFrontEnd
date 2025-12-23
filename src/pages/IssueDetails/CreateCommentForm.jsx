import {
    Form,
    FormField,
    FormMessage,
    FormControl,
    FormItem
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch } from "react-redux"
import { createComment } from "@/Redux/Comment/Action"

function CreateCommentForm({ issueId }) {
    
    const dispatch=useDispatch()
    const form = useForm({
        defaultValues: {
            content: "",
        }
    })

    const onSubmit = (data) => {
        dispatch(createComment( {content:data.content,issueId} ))
    }

    return (
        <div>
            <Form {...form}>
                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => <FormItem>
                            <div className="flex gap-2">
                                <div>
                                    <Avatar>
                                        <AvatarFallback className="bg-violet-500 text-white">R</AvatarFallback>
                                    </Avatar>
                                </div>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="w-[20rem]"
                                        placeholder="add comment ... "
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>

                        </FormItem>}
                    />

                    <Button type="submit"> Save </Button>

                </form>
            </Form>
        </div>
    )
}

export default CreateCommentForm;