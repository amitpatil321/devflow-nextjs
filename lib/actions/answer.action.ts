"use server";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerProps } from "./shared.types";

export async function createAnswer(params: CreateAnswerProps) {
  try {
    console.log(params);
    connectToDatabase();
    const { content, authorId, questionId, path } = params;
    const newAnswer = await Answer.create({
      content,
      author: authorId,
      question: questionId,
    });

    // push answer id to the answeres list of the question
    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
