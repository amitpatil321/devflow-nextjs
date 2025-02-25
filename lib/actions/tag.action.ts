"use server";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TopInteractedTags } from "./shared.types";

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
