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
import { useState } from "react";
import { CheckCircle, Hourglass, SendHorizonal, XCircle } from "lucide-react";
import { TurnstileField } from "@/components/turnstile-field";
import { TURNSTILE_ACTIONS } from "@/lib/turnstile-sitekey";

/** Project type options shown on the contact form. */
const PROJECT_TYPES = [
  "Fence Staining & Wood Restoration",
  "Interior & Exterior Painting",
  "Fence Installation & Repairs",
  "Exterior Wood Structures",
  "Other",
] as const;

const formSchema = z.object({
  name: z
    .string({
      error: (issue) => (issue.input === undefined ? "Name is required." : undefined),
    })
    .min(2, {
      error: "Enter more than 2 characters.",
    }),
  email: z.email("Invalid email.").min(1, {
    error: "Email address is required.",
  }),
  phone: z
    .string({
      error: (issue) => (issue.input === undefined ? "Phone is required." : undefined),
    })
    .refine(
      (val) => isValidPhoneNumber(val, { defaultCountry: "US" }),
      "Please provide a valid phone number.",
    )
    .transform((val) => parsePhoneNumber(val, { defaultCountry: "US" }).number.toString()),
  serviceType: z.enum(PROJECT_TYPES, {
    error: (issue) =>
      issue.input === undefined
        ? "Please select a service type."
        : "Please select a valid service type.",
  }),
  message: z.string({
    error: (issue) =>
      issue.input === undefined ? "Please write your project details." : undefined,
  }),
});

interface ContactFormProps {
  showHeader: boolean;
}

// Form component
export function ContactForm(props: ContactFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [turnstileHint, setTurnstileHint] = useState<string | null>(null);

  // Resolvers v6: Input vs Output (phone transform) need the 3-type useForm form.
  const form = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "" as z.input<typeof formSchema>["serviceType"],
      message: "",
    },
  });

  // CF Worker API (Netlify Forms path retired on cf-preview).
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setStatus("pending");
      setError(null);

      if (!turnstileToken) {
        setStatus("error");
        setError("Please complete the human verification challenge.");
        return;
      }

      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken,
          contact: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            serviceType: values.serviceType,
            message: values.message,
          },
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        reason?: string;
        message?: string;
      };

      // Tokens are single-use — always refresh the widget after an attempt.
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);

      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }

      setStatus("error");
      setError(
        payload.reason || payload.message || payload.error || `${res.status} ${res.statusText}`,
      );
    } catch (e) {
      setTurnstileToken(null);
      setTurnstileReset((n) => n + 1);
      setStatus("error");
      setError(`${e}`);
    }
  });

  return (
    <>
      <Form {...form}>
        {props.showHeader ? (
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-2xl font-bold">Request a Free Estimate</h2>
            <p className="text-sm text-zinc-600">Our team will reach out within 24 hours.</p>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-2 sm:space-y-4" name="contact-form">
          <section className="grid gap-2 sm:grid-cols-2 sm:gap-5">
            <FormField
              control={form.control}
              name="name"
              disabled={status === "pending"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" required minLength={2} type="text" {...field} />
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
                    <Input placeholder="hello@example.com" required type="email" {...field} />
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

          <TurnstileField
            action={TURNSTILE_ACTIONS.contact}
            resetSignal={turnstileReset}
            onToken={(token) => {
              setTurnstileToken(token);
              if (token) setTurnstileHint(null);
            }}
            onWidgetError={setTurnstileHint}
            className="pt-4"
          />
          {turnstileHint ? (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
              {turnstileHint}
            </p>
          ) : null}

          <section className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:gap-6">
            <Button
              type="submit"
              disabled={status === "pending" || status === "ok" || !turnstileToken}
              size="lg"
              className={`min-w-full sm:min-w-[12rem] ${ctaPrimaryClassName}`}
            >
              Request a Free Estimate <SendHorizonal size={16} className="ml-2" />
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
                  {error ? `Submission failed: ${error}` : "Submission failed, please try again."}
                </p>
              )}
            </span>
          </section>
        </form>
      </Form>
    </>
  );
}
