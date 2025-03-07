import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetQuestionsProps {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateQuestionProps {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface UpdateQuestionProps {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

export interface GetUserProps {
  userId: string;
}

export interface CreateUserProps {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserProps {
  clerkId: string;
  updateData: {
    name: string;
    username: string;
    email: string;
    picture: string;
  };
  revalidatePath: string;
}

export interface DeleteUserProps {
  clerkId: string;
  revalidatePath: string;
}

export interface TopInteractedTags {
  userId: string;
}
export interface GetTagById {
  tagId: string;
}
export interface GetQuestionDetailsProps {
  questionId: string;
}
export interface CreateAnswerProps {
  authorId: string;
  questionId: string;
  content: string;
  path: string;
}

export interface GetAllAnswersProps {
  questionId: string;
}

export interface QuestionVoteProps {
  itemId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}
export interface AnswerVoteProps {
  itemId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface ToggleSaveQuestionProps {
  userId: string;
  itemId: string;
  path: string;
}

export interface SavedQuestionsProps {
  clerkId: string;
  searchQuery: string | undefined;
}

export interface ViewQuestionProps {
  userId: string;
  questionId: string;
}

export interface UserInfoProps {
  userId: string;
}

export interface UserQuestionsProps {
  userId: string;
}

export interface UserAnswersProps {
  userId: string;
}

export interface DeleteQuestionProps {
  questionId: string;
  path: string;
}
export interface DeleteAnswerProps {
  answerId: string;
  path: string;
}

export interface UpdateProfileProps {
  userId: string;
  name: string;
  username: string;
  portfolioWebsite: string;
  location: string;
  bio: string;
  path: string;
}

export interface SearchParamsProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
