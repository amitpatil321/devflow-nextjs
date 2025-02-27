"use server";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionProps } from "./shared.types";

export async function viewQuestion(params: ViewQuestionProps) {
  const { questionId, userId } = params;
  try {
    await connectToDatabase();

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) console.log(`Interaction exists`);

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
