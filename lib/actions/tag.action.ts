"use server";
import { ItemsPerPage } from "@/constants";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsProps, GetTagById, TopInteractedTags } from "./shared.types";

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

export async function getAllTags(params: GetAllTagsProps) {
  try {
    connectToDatabase();
    const { searchQuery: searchTerm, filter, page } = params;
    const pageNumber = Number(page) || 1;

    const matchStage: FilterQuery<typeof Tag> = {};

    if (searchTerm) {
      matchStage.$or = [{ name: new RegExp(searchTerm, "i") }];
    }

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { numQuestions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
    }

    const pipeline: any[] = [
      { $match: matchStage },
      { $addFields: { numQuestions: { $size: "$questions" } } },
    ];

    if (sortOptions && Object.keys(sortOptions).length > 0) {
      pipeline.push({ $sort: sortOptions });
    }

    // return await Tag.find(query).sort(sortOptions);
    // return await Tag.aggregate([
    //   { $match: matchStage },
    //   { $addFields: { numQuestions: { $size: "$questions" } } },
    //   { $sort: sortOptions || {} },
    // ]);

    const tags = await Tag.aggregate(pipeline)
      .skip((pageNumber - 1) * ItemsPerPage)
      .limit(ItemsPerPage);
    const total = await Tag.countDocuments(pipeline);
    return { tags, total };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function questionsBytagId(params: GetTagById) {
  try {
    connectToDatabase();
    const { tagId, page } = params;
    const pageNumber = Number(page) || 1;

    const response = await Tag.findById(tagId).populate({
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
      options: {
        sort: { createdAt: -1 },
        skip: (pageNumber - 1) * ItemsPerPage,
        limit: ItemsPerPage,
      },
    });

    const totalResponse = await Tag.findById(tagId);

    return { response, total: totalResponse.questions.length };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    await connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
