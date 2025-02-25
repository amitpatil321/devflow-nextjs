import { InferSchemaType, model, models, Schema } from "mongoose";

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: new Date() },
});

export type IAnswer = InferSchemaType<typeof AnswerSchema>;

const Answer = models.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
