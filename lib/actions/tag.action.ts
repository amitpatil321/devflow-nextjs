"use server";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTagById, TopInteractedTags } from "./shared.types";

export async function getTopInteractedTags(params: TopInteractedTags) {
  try {
    // connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
      { _id: "3", name: "redux" },
      { _id: "4", name: "python" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags() {
  try {
    connectToDatabase();
    return await Tag.find();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function questionsBytagId(params: GetTagById) {
  try {
    connectToDatabase();
    const { tagId } = params;

    const questions = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      select: "_id title upvotes downvotes answers tags author views createdAt",
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
        {
          path: "author",
          model: User,
          select: "_id name picture",
        },
      ],
    });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
