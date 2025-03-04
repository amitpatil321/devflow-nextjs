import { z } from "zod";

export const AskQuestionSchema = z.object({
  title: z.string().min(2).max(150),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerScheme = z.object({
  answer: z
    .string()
    .min(100, { message: "Answer must contain at least 100 characters" })
    .max(10000),
});

export const ProfileValidationSchema = z.object({
  name: z.string().min(5, { message: "Name is required" }).max(50).trim(),
  username: z
    .string()
    .min(5, { message: "Username is required" })
    .max(50)
    .trim(),
  bio: z
    .string()
    .min(20, { message: "Bio must contain atleast 20 characters" })
    .max(500)
    .trim(),
  portfolioWebsite: z.union([z.string().url().trim(), z.literal("")]),
  location: z.string().min(2).max(50),
});
