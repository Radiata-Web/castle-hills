"use client";

import { Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/ballpark";
import { ctaPrimaryClassName } from "@/lib/cta";
import { cn } from "@/lib/utils";

const contactFormSchema = contactSchema;

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ContactFormOutput = z.output<typeof contactFormSchema>;

type ContactStepProps = {
  defaultValues?: Partial<ContactFormValues>;
  honeypot: string;
  onHoneypotChange: (value: string) => void;
  submitting: boolean;
  canSubmit: boolean;
  error?: string | null;
  onBack: () => void;
  onSubmit: (values: ContactFormOutput) => void;
};

export function ContactStep({
  defaultValues,
  honeypot,
  onHoneypotChange,
  submitting,
  canSubmit,
  error,
  onBack,
  onSubmit,
}: ContactStepProps) {
  const form = useForm<ContactFormValues, unknown, ContactFormOutput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      zip: defaultValues?.zip ?? "",
      notes: defaultValues?.notes ?? "",
    },
  });

  return (
    <div className="max-w-xl space-y-6 animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ease-out fill-mode-both motion-reduce:slide-in-from-bottom-0">
      <div className="space-y-2">
        <h2
          tabIndex={-1}
          className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 text-balance outline-none"
        >
          Where should we reach you?
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 text-pretty">
          Your ballpark range appears on the next screen. A Castle Hills team member may follow up
          to answer questions—no obligation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            aria-hidden
            value={honeypot}
            onChange={(e) => onHoneypotChange(e.target.value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(214) 555-0123"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              disabled={submitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP code</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      {...field}
                      className="h-12 tabular-nums"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              disabled={submitting}
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Anything else we should know? (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <p className="text-sm text-zinc-500">
            By continuing you agree we may contact you about this project. See our{" "}
            <Link to="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-zinc-100 max-sm:sticky max-sm:bottom-0 max-sm:-mx-5 max-sm:px-5 max-sm:py-4 max-sm:bg-card/95 max-sm:backdrop-blur max-sm:supports-[backdrop-filter]:bg-card/80 max-sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button
              type="button"
              variant="ghost"
              className="min-h-11 enabled:active:scale-[0.96] transition-[scale] duration-150 ease-out"
              onClick={onBack}
              disabled={submitting}
            >
              <ChevronLeft className="size-4" aria-hidden />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || submitting}
              className={cn(
                ctaPrimaryClassName,
                "min-h-11 min-w-[12rem] enabled:active:scale-[0.96] transition-[scale] duration-150 ease-out",
              )}
            >
              {submitting ? (
                <>
                  <Spinner />
                  Calculating…
                </>
              ) : (
                "See my ballpark"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
