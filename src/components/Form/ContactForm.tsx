"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTurnstile } from "@/hooks/useTurnstile";
import { Turnstile } from "@marsidev/react-turnstile";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./formSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input, Textarea, Button } from "./formComponents";

const defaultValues: Partial<FormValues> = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const {
    turnstileToken,
    isVerified,
    turnstileMessage,
    handleTurnstileSubmission,
  } = useTurnstile();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  async function onSubmit(data: FormValues) {
    if (!turnstileToken) {
      setError({ message: "Invalid Turnstile Token" });
      return;
    }
    // delay loading indicator by 1s
    const loadingTimerID = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    try {
      const req = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const res = await req.json();

      clearTimeout(loadingTimerID);
      if (req.status >= 400) {
        setIsLoading(false);
        setError({
          message: res.errors?.[0]?.message || "Internal Server Error",
        });
        return;
      }
      form.reset();
      setIsLoading(false);
      setHasSubmitted(true);
    } catch (err) {
      console.error("Error caught in catch block:", err);
      setIsLoading(false);
      setError({
        message: "Unknown Error",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="card space-y-4 rounded-xl py-10 px-6 md:px-10 md:min-w-xl flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={hasSubmitted} {...field} />
                </FormControl>
                <FormMessage className="absolute right-0 -top-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={hasSubmitted} {...field} />
                </FormControl>
                <FormMessage className="absolute right-0 -top-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea disabled={hasSubmitted} {...field} />
                </FormControl>
                <FormMessage className="absolute right-0 -top-1" />
              </FormItem>
            )}
          />
          {/* this div prevents Cumulative Layout Shift*/}
          <div className="min-h-[72px] min-w-[300px]">
            <Turnstile
              options={{
                theme: "light",
              }}
              siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
              onSuccess={handleTurnstileSubmission}
            />
          </div>
          {/* form message */}
          <p className="text-zinc-700 font-semibold min-h-[24px]">
            {isLoading
              ? "Loading, please wait..."
              : error
                ? error.message
                : !hasSubmitted && turnstileMessage
                  ? turnstileMessage
                  : hasSubmitted
                    ? "Your message has been submitted!"
                    : null}
          </p>
          <Button isVerified={isVerified} hasSubmitted={hasSubmitted}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
