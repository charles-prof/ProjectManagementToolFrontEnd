import {
    Form,
    FormField,
    FormMessage,
    FormControl,
    FormItem
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { tags } from "../ProjectList/ProjectList"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { inviteToProject } from "@/Redux/Project/Action"
import { useParams } from "react-router-dom"


function InviteUserForm() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const handleTagsChange = (tags) => {
        const currentTags = form.getValues("tags")
        const updatedTags = currentTags.includes(tags) ? currentTags.filter(tag => tag !== tags) : [...currentTags, tags]
        form.setValue("tags", updatedTags)
    }

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            tags: ["javaScript", "React"]
        }
    })

    const onSubmit = (data) => {
        dispatch(inviteToProject({email:data.email, projectId:id}))
    }

    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Email ... "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    />

                    <DialogClose>
                          <Button type="submit" className="w-110 ml-2"> Invite Users </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default InviteUserForm
