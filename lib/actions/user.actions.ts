"use server";

import { revalidatePath } from "next/cache";

import paths from "@/constants/paths";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserProps,
  DeleteUserProps,
  GetUserProps,
  SavedQuestionsProps,
  ToggleSaveQuestionProps,
  UpdateUserProps,
  UserAnswersProps,
  UserInfoProps,
  UserQuestionsProps,
} from "./shared.types";

export async function getAllUsers() {
  try {
    connectToDatabase();
    return await User.find({ createdAt: -1 });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserProps) {
  try {
    connectToDatabase();
    return await User.create(userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(data: UpdateUserProps) {
  try {
    connectToDatabase();
    const { clerkId, updateData, revalidatePath: path } = data;
    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    if (updatedUser) {
      revalidatePath(path);
    }
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserProps) {
  try {
    connectToDatabase();
    const { clerkId, revalidatePath: path } = params;

    // Since we have deleted the user,
    // we need to delete all the questions, answers, comments ets from our database
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found!");
    }

    // Delete all the questions related to this author
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (deletedUser) {
      revalidatePath(path);
      revalidatePath(`${paths.home}`);
    }
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserProps) {
  try {
    connectToDatabase();

    const { userId } = params;
    return await User.findOne({ clerkId: userId });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggeSaveQuestion(params: ToggleSaveQuestionProps) {
  try {
    connectToDatabase();
    const { userId, itemId, path } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isSaved = user.saved.includes(itemId);

    await User.findByIdAndUpdate(userId, {
      [isSaved ? "$pull" : "$addToSet"]: { saved: itemId },
    });

    revalidatePath(path);

    // TODO : show toast message
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: SavedQuestionsProps) {
  const { clerkId } = params;
  connectToDatabase();

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    const questions = await Question.find({ _id: { $in: user.saved } })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return questions || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: UserInfoProps) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }
    const questionCount = await Question.countDocuments({ author: user._id });
    const answerCount = await Answer.countDocuments({ author: user._id });

    return { user, questionCount, answerCount };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: UserQuestionsProps) {
  try {
    const { userId } = params;
    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: -1,
        upvotes: -1,
      })
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return userQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: UserAnswersProps) {
  try {
    const { userId } = params;
    const userAnswers = await Answer.find({ author: userId })
      .sort({
        upvotes: -1,
      })
      .populate({ path: "question", model: Question, select: "_id title" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return userAnswers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
