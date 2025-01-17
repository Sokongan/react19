"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { UserFormSchema, userUpdateSchema } from "@/zod/schemas/userSchema"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"



export default function ProfileForm() {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      username: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });
  // Submit handler
  function onSubmit(data: UserFormSchema) {
    console.log("Form Data:", data);
    alert("Form submitted successfully!");
  }
  return (

      <div className="grid grid-cols-2">
           <div>
              <h1>User Information</h1>
              <Label>View and update your personal details and account information.</Label>
           </div>
           <div className=" ">
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 pt-6 pb-6 py-6"> */}
               {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Middle Name Field */}
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your middle name" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can leave this field empty if you don’t have a middle name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </div>
          </div> */}
           
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter a secure password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator/>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
           </div>
      </div>
     
  );
}
