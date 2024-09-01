"use client";

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Basic "contact me" form schema
const formSchema = z.object({
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Enter more than 2 characters.",
  }),
  email: z
    .string({ required_error: "Email address is required." })
    .min(1, { message: "Email address is required." })
    .email("Invalid email."),
  phone: z
    .string({ required_error: "Phone is required." })
    .refine(isValidPhoneNumber, "Please provide a valid phone number.")
    .transform((val) => parsePhoneNumber(val).number.toString()),
  serviceType: z.enum(["staining", "installation", "painting", "custom"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select a service type." };
    },
  }),
  message: z.string({ required_error: "Please write your project details." }),
});

// Form component
export function ContactForm() {
  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold mb-4">Get a free estimate today!</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-4"
        name="contact"
        netlify
      >
        <section className="grid gap-2 sm:grid-cols-2 sm:gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="hello@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <section className="grid gap-2 sm:grid-cols-2 sm:gap-5">
          {/* Phone number */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service type */}
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="staining"
                      className="hover:cursor-pointer"
                    >
                      Staining
                    </SelectItem>
                    <SelectItem
                      value="installation"
                      className="hover:cursor-pointer"
                    >
                      Installation
                    </SelectItem>
                    <SelectItem
                      value="painting"
                      className="hover:cursor-pointer"
                    >
                      Painting
                    </SelectItem>
                    <SelectItem value="custom" className="hover:cursor-pointer">
                      Custom
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Give us some details about your project! The more we know, the more accurate of an estimate we can give you."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">
          Request estimate
        </Button>
      </form>
    </Form>
  );
}
