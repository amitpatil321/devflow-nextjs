import { InferSchemaType, model, models, Schema } from "mongoose";

// export interface IQuestion extends Document {
//   title: string;
//   content: string;
//   tags: Schema.Types.ObjectId[];
//   views: number;
//   upvotes: Schema.Types.ObjectId[];
//   downvotes: Schema.Types.ObjectId[];
//   author: Schema.Types.ObjectId;
//   answers: Schema.Types.ObjectId[];
//   createdAt: Date;
// }

const QuestionSchema = new Schema({
  title: { type: "string", required: true },
  content: { type: "string", required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: "number", default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: new Date() },
});

export type IQuestion = InferSchemaType<typeof QuestionSchema>;

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
