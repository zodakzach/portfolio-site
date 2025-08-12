import { z } from "zod";

export const env = z
  .object({
    RESEND_API_KEY: z.string().min(1),
    FROM_EMAIL: z.string().email(),
    TO_EMAIL: z.string().email(),
    RECAPTCHA_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
    GITHUB_TOKEN: z.string().min(1),
    GITHUB_USERNAME: z.string().min(1),
  })
  .parse(process.env);
