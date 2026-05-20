"use client";

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { ctaPrimaryClassName } from "@/lib/cta";
import {
  Form,
  FormControl,
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
import { zfd } from "zod-form-data";
import { useState } from "react";
import { CheckCircle, Hourglass, SendHorizonal, XCircle } from "lucide-react";

/** Must match `public/contact-form.html` option values for Netlify Forms. */
const PROJECT_TYPES = [
  "Custom Wood & Outdoor Living",
  "Painting & Finishes",
  "Interior & Exterior Restoration",
  "Commercial/HOA Work",
  "Other",
] as const;

// Form validation schema
const formSchema = zfd.formData({
  "form-name": z.string(),
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required." : undefined,
    })
    .min(2, {
      error: "Enter more than 2 characters.",
    }),
  email: z.email("Invalid email.").min(1, {
    error: "Email address is required.",
  }),
  phone: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Phone is required." : undefined,
    })
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Please provide a valid phone number.",
    )
    .transform((val) =>
      parsePhoneNumber(val, { defaultCountry: "US" }).number.toString(),
    ),
  serviceType: z.enum(PROJECT_TYPES, {
    error: (issue) =>
      issue.input === undefined
        ? "Please select a service type."
        : "Please select a valid service type.",
  }),
  message: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Please write your project details."
        : undefined,
  }),
});

interface ContactFormProps {
  showHeader: boolean;
}

// Form component
export function ContactForm(props: ContactFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  });

  // Submission handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.target);

    try {
      setStatus("pending");
      setError(null);

      const myForm = e.target as HTMLFormElement;
      const formData = new FormData(myForm);
      const res = await fetch("/contact-form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.status === 200) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus("error");
      setError(`${e}`);
    }
  };

  return (
    <>
      <Form {...form}>
        {props.showHeader ? (
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold">Request a Free Estimate</h2>
            <p className="text-sm text-zinc-600">
              Our team will reach out within 24 hours.
            </p>
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
              disabled={status === "pending"}
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
              disabled={status === "pending"}
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
              disabled={status === "pending"}
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
                  <FormLabel>Project Type</FormLabel>
                  <input type="hidden" name="serviceType" value={field.value} />
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={status === "pending"}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPES.map((projectType) => (
                        <SelectItem
                          key={projectType}
                          value={projectType}
                          className="hover:cursor-pointer"
                        >
                          {projectType}
                        </SelectItem>
                      ))}
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
            disabled={status === "pending"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project; the more details you provide, the better we can assist you."
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:gap-6">
            <Button
              type="submit"
              disabled={status === "pending" || status === "ok"}
              size="lg"
              className={`min-w-full sm:min-w-[12rem] ${ctaPrimaryClassName}`}
            >
              Request a Free Estimate{" "}
              <SendHorizonal size={16} className="ml-2" />
            </Button>

            <span className="text-sm text-gray-500">
              {status === "pending" && (
                <p className="flex flex-row gap-2 items-center">
                  <Hourglass size={16} />
                  Loading...
                </p>
              )}
              {status === "ok" && (
                <p className="flex flex-row gap-2 items-center text-green-500">
                  <CheckCircle size={16} />
                  Form submitted! We will get back to you as soon as possible.
                </p>
              )}
              {status === "error" && (
                <p className="flex flex-row gap-2 items-center text-red-500">
                  <XCircle size={16} />
                  Submission failed, please try again.
                </p>
              )}
            </span>
          </section>
        </form>
      </Form>
    </>
  );
}
