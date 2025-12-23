import { 
  Form,
  FormField, 
  FormMessage, 
  FormControl, 
  FormItem } from "@/components/ui/form"
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
import { useParams } from "react-router-dom"
import { createIssue } from "@/Redux/Issue/Action"


function CreateIssueForm({status}) {
    const {id} = useParams()
    const dispatch = useDispatch();
    const handleTagsChange = (tags) => {
            const currentTags = form.getValues("tags")
            const updatedTags = currentTags.includes(tags)? currentTags.filter(tag => tag !== tags):[...currentTags,tags]
            form.setValue("tags", updatedTags)
        }
    
        const form = useForm({
            defaultValues: {
                issueName: "",
                description: ""
            }
        })
    
        const onSubmit = (data) => {
            data.projectId = id
            dispatch(createIssue({
                title:data.issueName ,
                description:data.description ,
                projectId:id,
                status,
            }))
        }

    
    return (<div>
        <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="issueName"
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="issue name ... "
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="issue description ... "
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />
               
                <DialogClose>
                   <Button type="submit" className="w-full mt-5"> Create Issue </Button>
                </DialogClose>
            </form>
        </Form>
    </div>)
}


export default CreateIssueForm