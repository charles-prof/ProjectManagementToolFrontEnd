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
import { useSelector } from "react-redux";

function Signup({ toggle }) {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
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
             {auth.error && auth.error.response?.data?.message==="email already exists !!" && 
                       <div className="flex flex-col gap-2 items-center justify-center p-3 border border-red-400 bg-red-100 rounded-md text-red-600">
                            <p>Account already exists with this email.</p>
                            <Button variant="link" onClick={toggle} className="text-red-700 underline p-0 h-auto font-bold">
                                Sign In here
                            </Button>
                       </div>
             }
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