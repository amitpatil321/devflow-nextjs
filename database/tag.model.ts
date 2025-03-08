import { InferSchemaType, model, models, Schema } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: new Date() },
});

export type ITag = InferSchemaType<typeof TagSchema>;

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
