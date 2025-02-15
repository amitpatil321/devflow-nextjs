import { z } from "zod";

export const askQuestionSchema = z.object({
  title: z.string().min(2).max(150),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
