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
import { useDispatch } from "react-redux";
import { register } from "@/Redux/Auth/Action";
function Signup() {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
        }
    })

    const onSubmit = (data) => {
        dispatch(register(data))
    }

    return (
        <div className="space-y-5">
            <h1 className="title">Register</h1>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Full Name ... "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="text"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="User Email ... "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                    type="password"
                                    className="border w-full border-gray-700 py-5 px-5"
                                    placeholder="Password ... "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>}
                    />

                    <Button type="submit" className="w-full ml-2"> Register </Button>

                </form>
            </Form>
        </div>
    )
}

export default Signup