"use client"

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { CheckCircle, Hourglass, XCircle } from "lucide-react"

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
  serviceType: z
    .string({
      required_error: "Please select a service type.",
    })
    .refine(
      (val) => ["staining", "installation", "painting", "custom"].includes(val),
      {
        message: "Please select a valid service type.",
      }
    ),
  message: z.string({ required_error: "Please write your project details." }),
})

interface ContactFormProps {
  showHeader: boolean
}

// Form component
export function ContactForm(props: ContactFormProps) {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  })

  // Submission handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setStatus("pending")
      setError(null)

      const myForm = e.target as HTMLFormElement
      const formData = new FormData(myForm)
      const res = await fetch("/contact-form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
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
    <>
      <Form {...form}>
        {props.showHeader ? (
          <div className="flex flex-row gap-5 items-center mb-4">
            <h2 className="text-2xl font-bold">Request an Estimate</h2>
          </div>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="space-y-2 sm:space-y-4"
          name="contact-form"
          data-netlify="true"
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
                    <Input
                      placeholder="John Smith"
                      required
                      minLength={2}
                      type="text"
                      {...field}
                    />
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
                    <Input
                      placeholder="hello@example.com"
                      required
                      type="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="1234567890"
                      required
                      minLength={10}
                      maxLength={10}
                      type="tel"
                      {...field}
                    />
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
                    value={field.value}
                    required
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
                      <SelectItem
                        value="custom"
                        className="hover:cursor-pointer"
                      >
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
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="flex flex-row gap-5 items-center">
            <Button
              type="submit"
              className="min-w-full sm:min-w-10 mt-4 transition-all duration-200 ease-in-out sm:hover:scale-105"
            >
              Request estimate
            </Button>

            <span className="text-sm text-gray-500">
              {status === "pending" && (
                <p className="flex flex-row gap-1 items-center">
                  <Hourglass size={16} />
                  Loading...
                </p>
              )}
              {status === "ok" && (
                <p className="flex flex-row gap-1 items-center text-green-500">
                  <CheckCircle size={16} />
                  Form submitted successfully!
                </p>
              )}
              {status === "error" && (
                <p className="flex flex-row gap-1 items-center text-red-500">
                  <XCircle size={16} />
                  Form submission failed: {error}
                </p>
              )}
            </span>
          </section>
        </form>
      </Form>
    </>
  )
}
