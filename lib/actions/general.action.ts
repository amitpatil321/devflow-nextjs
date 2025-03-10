import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import type { GlobalSearchProps } from "./shared.types";

export async function globalSearch(params: GlobalSearchProps) {
  const { type, query } = params;

  if (!query) throw new Error("Search text not provided!");

  await connectToDatabase();

  const typeLowerCase = type?.toLowerCase();
  let results = [];
  try {
    switch (typeLowerCase) {
      case "question":
        results = await Question.find();
        break;
      // case "answer":
      //   results = await Answer.find().limit(3);
      //   // results = await Answer.find({ content: new RegExp(query, "i") })
      //   //   .populate({ path: "question", model: Question, select: "_id title" })
      //   //   .select("_id content")
      //   //   .lean();
      //   break;
      // case "user":
      //   results = await User.find({ name: new RegExp(query, "i") })
      //     .select("_id name")
      //     .lean();
      //   break;
      // case "tag":
      //   results = await Tag.find({ name: new RegExp(query, "i") })
      //     .select("_id name")
      //     .lean();
      //   break;
      default:
        throw new Error("Invalid search type");
    }

    // const results = await Question.find();

    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function globalSearch(params: GlobalSearchProps) {
//   try {
//     connectToDatabase();
//     // const { query } = params;
//     const questionId = "asdadtsadyusda";
//     const question = await Question.findById(questionId)
//       .populate({ path: "tags", model: Tag, select: "_id name" })
//       .populate({
//         path: "author",
//         model: User,
//         select: "_id clerkId name picture",
//       });

//     if (!question) {
//       throw new Error("Question not found");
//     }

//     return question;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
