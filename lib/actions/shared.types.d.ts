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
export interface GetQuestionDetailsProps {
  questionId: string;
}
