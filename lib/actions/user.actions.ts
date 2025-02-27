"use server";

import { revalidatePath } from "next/cache";

import paths from "@/constants/paths";
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

    if (updatedUser) revalidatePath(path);
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

    if (!user) throw new Error("User not found!");

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
    const user = await User.findOne({ clerkId: userId });
    return user;
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
    if (!user) throw new Error("User not found");

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
    if (!user) throw new Error("User not found");

    const questions = await Question.find({ _id: { $in: user.saved } })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return questions || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
