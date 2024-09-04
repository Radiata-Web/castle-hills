"use client"

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zfd } from "zod-form-data"
import { useState } from "react"

// Form validation schema
const formSchema = zfd.formData({
  "form-name": z.string(),
  name: z.string({ required_error: "Name is required." }).min(2, {
    message: "Enter more than 2 characters.",
  }),
  email: z
    .string({ required_error: "Email address is required." })
    .min(1, { message: "Email address is required." })
    .email("Invalid email."),
  phone: z
    .string({ required_error: "Phone is required." })
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Please provide a valid phone number."
    )
    .transform((val) =>
      parsePhoneNumber(val, { defaultCountry: "US" }).number.toString()
    ),
  serviceType: z.enum(["staining", "installation", "painting", "custom"], {
    required_error: "Please select a service type.",
  }),
  message: z.string({ required_error: "Please write your project details." }),
})

// Form component
export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: undefined,
      message: "",
    },
  })

  // Submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append("form-name", "contact-form")
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("serviceType", data.serviceType)
    formData.append("message", data.message)

    try {
      setStatus("pending")
      setError(null)

      // Validate fields with Zod schema
      // const validatedFields = formSchema.safeParse(data)
      // if (!validatedFields.success) {
      //   setStatus("error")
      //   setError(
      //     validatedFields.error.errors.map((err) => err.message).join(", ")
      //   )
      //   console.log(validatedFields.error.errors)
      //   return
      // }

      // Convert data to URLSearchParams
      // const formData = new URLSearchParams()
      // Object.entries(data).forEach(([key, value]) => {
      //   formData.append(key, value as string)
      // })

      // Submit form data to Netlify
      const res = await fetch("/contact-form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      })
      if (res.status === 200) {
        setStatus("ok")
      } else {
        setStatus("error")
        setError(`${res.status} ${res.statusText}`)
      }
    } catch (e) {
      setStatus("error")
      setError(`${e}`)
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold mb-4">Request a Free Estimate</h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 sm:space-y-4"
        name="contact-form"
        data-netlify="true"
        method="POST"
      >
        <input type="hidden" name="form-name" value="contact-form" />
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        {status === "pending" && <p>Loading...</p>}
        {status === "ok" && <p>Form submitted successfully!</p>}
        {status === "error" && <p>Form submission failed: {error}</p>}
      </form>
    </Form>
  )
}
