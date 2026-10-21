import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .max(100, { message: "Email must not exceed 100 characters." }),
  phone: z
    .string()
    .trim()
    .max(20, { message: "Phone number must not exceed 20 characters." })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(2, { message: "Subject must be at least 2 characters." })
    .max(100, { message: "Subject must not exceed 100 characters." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must not exceed 1000 characters." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
