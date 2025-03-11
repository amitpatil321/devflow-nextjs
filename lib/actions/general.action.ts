"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import type { GlobalSearchProps } from "./shared.types";

export async function globalSearch(params: GlobalSearchProps) {
  const { type, query } = params;

  if (!query) throw new Error("Search text not provided!");

  await connectToDatabase();

  const typeLowerCase = type?.toLowerCase();
  let results = {};

  const limit = 5;
  let questions, answers, users, tags;
  const match = new RegExp(query, "i");

  try {
    switch (typeLowerCase) {
      case "question": {
        questions = await Question.find({
          title: match,
        })
          .select("_id title")
          .limit(limit)
          .lean();
        break;
      }
      case "answer": {
        answers = await Answer.find({
          content: match,
        })
          .populate({ path: "question", model: Question, select: "_id title" })
          .select("_id content")
          .limit(limit)
          .lean();
        break;
      }
      case "user": {
        users = await User.find({
          name: match,
        })
          .select("_id clerkId name")
          .limit(limit)
          .lean();
        break;
      }
      case "tag": {
        tags = await Tag.find({
          name: match,
        })
          .select("_id name")
          .limit(limit)
          .lean<{ _id: string; name: string }[]>();
        break;
      }
      default: {
        // If no type is provided, search all collections
        [questions, answers, users, tags] = await Promise.all([
          Question.find({ title: match })
            .select("_id title")
            .limit(limit)
            .lean(),
          Answer.find({ content: match })
            .populate({ path: "question", select: "_id title" })
            .select("_id content question")
            .limit(limit)
            .lean(),
          User.find({ name: match })
            .select("_id clerkId name")
            .limit(limit)
            .lean(),
          Tag.find({ name: match }).select("_id name").limit(limit).lean(),
        ]);
      }
    }

    results = {
      question: (questions ?? []).map((q) => ({
        id: String(q._id),
        title: q.title,
        type: "question",
      })),
      answer: (answers ?? []).map((a) => ({
        id: a?.question ? String(a?.question._id) : "",
        title:
          extractSurroundingWords(a.content, query) ||
          `Answer contains word "${query}"`,
        type: "answer",
      })),
      user: (users ?? []).map((u) => ({
        id: String(u.clerkId),
        title: u.name,
        type: "user",
      })),
      tag: (tags ?? []).map((t) => ({
        id: String(t._id),
        title: t.name,
        type: "tag",
      })),
    };

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function extractSurroundingWords(
  text: string,
  searchWord: string,
  beforeCount = 5,
  afterCount = 5,
): string {
  text = text.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/);
  const index = words.findIndex((word) =>
    word.toLowerCase().includes(searchWord.toLowerCase()),
  );

  if (index === -1) return "";

  const start = Math.max(0, index - beforeCount);
  const end = Math.min(words.length, index + afterCount + 1);

  return words.slice(start, end).join(" ");
}
