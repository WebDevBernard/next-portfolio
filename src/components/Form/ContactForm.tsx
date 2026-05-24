"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTurnstile } from "@/hooks/useTurnstile";
import Turnstile from "./Turnstile";
import { useForm } from "react-hook-form";
import { contactEmail } from "@/lib/data";
import { formSchema, type FormValues } from "./formSchema";
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
    widgetRef,
    handleTurnstileSubmission,
    resetTurnstile,
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
    setIsLoading(true);
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
          turnstileToken,
        }),
      });
      const res = await req.json();

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
        message: `Something went wrong. Please try again or email me directly at ${contactEmail}.`,
      });
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 80, damping: 8 },
      }}
      viewport={{ once: true, margin: "-80px" }}
      className="md:mx-auto max-w-lg w-full"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full rounded-lg p-6 space-y-4 flex flex-col justify-between bg-[#fafafa] border-2 border-zinc-400 shadow-[0_6px_0_rgb(161,161,170)]"
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
          <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3">
            <div className="shrink-0 w-[113px] h-[105px] overflow-hidden">
              <div className="scale-75 origin-top-left w-[150px]">
                <Turnstile
                  ref={widgetRef}
                  siteKey={import.meta.env.PUBLIC_CLOUDFLARE_SITE_KEY}
                  options={{ theme: "light", size: "compact" }}
                  onSuccess={handleTurnstileSubmission}
                  onExpire={resetTurnstile}
                  onError={resetTurnstile}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 w-full self-center">
              <p className={`text-xs mb-1.5 ${error ? "text-red-500" : "text-zinc-500"}`}>
                {error
                  ? error.message
                  : hasSubmitted
                    ? "Your message has been submitted!"
                    : isVerified
                      ? "Not a robot. Ready to submit."
                      : "Verify you're human, then click submit."}
              </p>
              <Button
                isVerified={isVerified}
                isLoading={isLoading}
                hasSubmitted={hasSubmitted}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
