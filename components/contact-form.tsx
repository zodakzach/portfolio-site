"use client";

import React, { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import Loader from "@/components/loader";
import { toast } from "sonner";
import { contactSchema } from "@/lib/validators/contact";

// Client-side schema excludes the server-only recaptchaToken
const formSchema = contactSchema.omit({ recaptchaToken: true });
export type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { resolvedTheme } = useTheme(); // ✅ system-safe
  const [mounted, setMounted] = useState(false);

  // Avoid SSR mismatch for next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  async function onSubmit(values: ContactFormValues) {
    if (!recaptchaToken) {
      toast.error("Please complete the CAPTCHA to prove you're human.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });

      if (response.ok) {
        toast.success("Message sent!", {
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        form.reset();
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        const errorData = await response.json();
        console.error("Contact API error:", errorData);
        toast.error(
          errorData.error || "Failed to send message. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contact-name">Name</FormLabel>
              <FormControl>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  autoComplete="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contact-email">Email</FormLabel>
              <FormControl>
                <Input
                  id="contact-email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="contact-message">Message</FormLabel>
              <FormControl>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your project..."
                  className="min-h-[120px]"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* reCAPTCHA with Skeleton placeholder */}
        <div className="flex justify-center">
          <div className="h-[78px] w-[304px]">
            {mounted ? (
              <ReCAPTCHA
                ref={recaptchaRef}
                key={resolvedTheme} // force remount on theme change
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token: string | null) => setRecaptchaToken(token)}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                className="scale-90 transform md:scale-100"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
