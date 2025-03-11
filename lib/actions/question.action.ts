"use server";

import { ItemsPerPage } from "@/constants";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionProps,
  DeleteQuestionProps,
  GetQuestionDetailsProps,
  GetQuestionsProps,
  QuestionVoteProps,
  UpdateQuestionProps,
} from "./shared.types";

export async function getQuestions(params: GetQuestionsProps) {
  try {
    await connectToDatabase();
    const { searchQuery: searchTerm, filter, page } = params;
    const query: FilterQuery<typeof Question> = {};
    const pageNumber = Number(page) || 1;

    if (searchTerm) {
      query.$or = [
        { title: new RegExp(searchTerm, "i") },
        { content: new RegExp(searchTerm, "i") },
      ];
    }

    let sortOptions = {};
    // filter questions
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      case "recomended":
        sortOptions = { views: -1 };
        break;
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage)
      .sort(sortOptions);

    return { questions, total: await Question.countDocuments() };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionProps) {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;
    const question = await Question.create({
      title,
      content,
      author,
    });

    // Create the tags or get them if they exists already
    const allTags = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );
      allTags.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: allTags } },
    });

    // Create

    // Increase authors reputation by +5 for asking new question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateQuestion(params: UpdateQuestionProps) {
  try {
    connectToDatabase();
    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId);

    if (!question) throw new Error("Question not found");

    question.title = title;
    question.content = content;

    question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionDetailsProps) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .lean();

    if (!question) {
      throw new Error("Question not found");
    }

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteProps) {
  try {
    connectToDatabase();

    console.log("upvoteQuestion :", params.itemId);

    const { itemId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};
    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error("Question not found");

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteProps) {
  try {
    connectToDatabase();
    const { itemId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};
    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!question) throw new Error("Question not found");

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionProps) {
  try {
    connectToDatabase();
    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotQuestions() {
  try {
    await connectToDatabase();

    const hotQuestions = await Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return hotQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
