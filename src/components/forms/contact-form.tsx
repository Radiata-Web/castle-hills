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

// Basic "contact me" form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter more than 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email("Invalid email."),
  phone: z
    .string()
    .refine(isValidPhoneNumber, "Please provide a valid phone number.")
    .transform((val) => parsePhoneNumber(val).number.toString()),
  message: z.string(),
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
      <h2 className="text-2xl font-bold mb-4">Let's get in touch</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-4"
        name="contact"
        data-netlify="true"
      >
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

        <section className="grid gap-2 sm:grid-cols-2 sm:gap-5">
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
        </section>

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
}
