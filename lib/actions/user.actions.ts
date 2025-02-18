"use server";

import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserProps,
  DeleteUserProps,
  GetUserProps,
  UpdateUserProps,
} from "./shared.types";

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

    console.log(clerkId, user);

    if (!user) throw new Error("User not found!");

    // // Delete all the questions related to this author
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (deletedUser) revalidatePath(path);
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
