"use server";

import { revalidatePath } from "next/cache";

import { ItemsPerPage } from "@/constants";
import paths from "@/constants/paths";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { BadgeCriteriaType } from "@/types";
import mongoose, { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { assignBadges } from "../utils";
import {
  CreateUserProps,
  DeleteUserProps,
  GetUserProps,
  SavedQuestionsProps,
  ToggleSaveQuestionProps,
  UpdateProfileProps,
  UpdateUserProps,
  UserAnswersProps,
  UserInfoProps,
  UserQuestionsProps,
} from "./shared.types";

interface GetAllUsersProps {
  searchQuery: string | null;
  filter: string | null;
  page: string | null;
}

export async function getAllUsers(params: GetAllUsersProps) {
  try {
    connectToDatabase();
    const { searchQuery: searchTerm, filter, page } = params;
    const query: FilterQuery<typeof User> = {};
    const pageNumber = Number(page) || 1;

    if (searchTerm) {
      query.$or = [
        { name: new RegExp(searchTerm, "i") },
        { username: new RegExp(searchTerm, "i") },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage);
    return { users, total: await User.countDocuments() };
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
  const { clerkId, searchQuery: searchTerm, filter, page } = params;
  const pageNumber = Number(page) || 1;

  await connectToDatabase();

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
    }

    if (!Array.isArray(user.saved) || user.saved.length === 0) {
      return { questions: [], total: 0 };
    }

    const savedQuestionIds = user.saved.map(
      (id: string) => new mongoose.Types.ObjectId(id),
    );

    const query: FilterQuery<typeof Question> = {
      _id: { $in: savedQuestionIds },
    };

    if (searchTerm) {
      query.$or = [
        { title: new RegExp(searchTerm, "i") },
        { content: new RegExp(searchTerm, "i") },
      ];
    }

    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage)
      .sort(sortOptions);

    return { questions, total: await Question.countDocuments(query) };
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

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [answersUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [questionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: questionCount },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: answerCount },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answersUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    // @ts-expect-error : to do later
    const badgeCounts = assignBadges({ criteria });

    return {
      user,
      questionCount,
      answerCount,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: UserQuestionsProps) {
  try {
    const { userId, page } = params;
    const pageNumber = Number(page) || 1;

    await connectToDatabase();

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
      })
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage);
    return {
      userQuestions,
      total: await Question.countDocuments({ author: userId }),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: UserAnswersProps) {
  try {
    const { userId, page } = params;
    const pageNumber = Number(page) || 1;

    const userAnswers = await Answer.find({ author: userId })
      .sort({
        upvotes: -1,
      })
      .populate({ path: "question", model: Question, select: "_id title" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage);

    return {
      userAnswers,
      total: await Answer.countDocuments({ author: userId }),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateProfile(params: UpdateProfileProps) {
  try {
    connectToDatabase();

    const { userId, name, username, portfolioWebsite, location, bio, path } =
      params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.name = name;
    user.username = username;
    user.portfolioWebsite = portfolioWebsite;
    user.location = location;
    user.bio = bio;
    await user.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error);
  }
}
