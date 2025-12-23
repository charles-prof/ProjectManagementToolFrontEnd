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
import { createProjects } from "@/Redux/Project/Action"

export default function EditProjectForm({ project }) {

    const dispatch = useDispatch()

    const handleTagsChange = (tags) => {
        const currentTags = form.getValues("tags")
        const updatedTags = currentTags.includes(tags) ? currentTags.filter(tag => tag !== tags) : [...currentTags, tags]
        form.setValue("tags", updatedTags)
    }

    const form = useForm({
        defaultValues: {
            name: project.name,
            description: project.description,
            category: project.category,
            tags: project.tags
        }
    })

    const onSubmit = (data) => {
        dispatch(createProjects(data))
    }

    return (<div>
        <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="project name ... "
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
                                placeholder="project description ... "
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Select
                                defaultValue="fullstack"
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                            // className="border w-full border-gray-700 py-5 px-5"
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fullstack">Full Stack</SelectItem>
                                    <SelectItem value="frontend">Front End</SelectItem>
                                    <SelectItem value="backend">Back End</SelectItem>

                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => <FormItem>
                        <FormControl>
                            <Select
                                onValueChange={(value) => {
                                    handleTagsChange(value)
                                }}
                            // className="border w-full border-gray-700 py-5 px-5"
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tags" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tags?.map((item) => (<SelectItem key={item} value={item} > {item} </SelectItem>))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <div className="flex gap-1 flex-wrap">
                            {field.value.map((item) => <div key={item} onClick={() => handleTagsChange(item)} className="cursor-pointer flex rounded-full items-center border gap-2 mt-2 p-1 bg-violet-500 text-white">
                                <span className="text-sm">{item}</span>
                                <Cross1Icon className="h-3 w-3" />
                            </div>)}

                        </div>
                        <FormMessage />
                    </FormItem>}
                />

                <DialogClose>
                    {false ? (<div>
                        <p> you can create only 3 projet with free plan , please upgrad your plan </p>
                    </div>)
                        : (<Button type="submit" className="w-full mt-5"> Confirm Changes </Button>)}
                </DialogClose>
            </form>
        </Form>
    </div>)
}