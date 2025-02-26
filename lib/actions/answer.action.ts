"use server";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerProps, GetAllAnswersProps } from "./shared.types";

export async function createAnswer(params: CreateAnswerProps) {
  try {
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

export async function getAllAnswers(params: GetAllAnswersProps) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const allAnswers = await Answer.find({
      question: questionId,
    }).populate({
      path: "author",
      model: User,
      select: "_id clerkId name picture saved",
    });
    return allAnswers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
