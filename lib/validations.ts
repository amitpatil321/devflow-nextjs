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
