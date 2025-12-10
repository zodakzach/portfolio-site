import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  recaptchaToken: z
    .string()
    .min(1, { message: "reCAPTCHA token is required." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
