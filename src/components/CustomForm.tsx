"use client";
import { useTurnstile } from "@/hooks/useTurnstile";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@marsidev/react-turnstile";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email({ message: "Please enter a valid email." }),
  message: z
    .string()
    .min(4, { message: "Message must be at least 4 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  name: "",
  email: "",
  message: "",
};

export function CustomForm() {
  const {
    turnstileToken,
    isVerified,
    turnstileMessage,
    handleTurnstileSubmission,
  } = useTurnstile();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
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
          className="space-y-4 rounded-xl p-10 flex flex-col w-full max-w-xl bg-gray-100 shadow-[0_6px_0_rgb(63,63,70)] border-2 border-zinc-700"
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
          <Turnstile
            className="hidden"
            options={{
              size: "invisible",
              theme: "light",
            }}
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
            onSuccess={handleTurnstileSubmission}
          />
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
          <Button
            disabled={!isVerified || hasSubmitted}
            type="submit"
            variant={"submit"}
            size="submit"
            className={cn("bg-lime-300 hover:bg-lime-400/80")}
          >
            <Image
              src="./autonavi.svg"
              alt={"autonavi"}
              width={40}
              height={40}
              className="text-zinc-700 select-none"
              unoptimized
            />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
