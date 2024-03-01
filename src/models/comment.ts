import { Schema, Types, model } from "mongoose";

interface IComment {
  comment_text: string;
  user_id: Types.ObjectId;
  product_id: Types.ObjectId;
  create_at: Date;
}

const commentSchema = new Schema<IComment>({
  comment_text: { type: String },
  user_id: { type: Schema.Types.ObjectId },
  product_id: { type: Schema.Types.ObjectId },
  create_at: { type: Date, default: Date.now },
});

const Comment = model<IComment>("comments", commentSchema);

export default Comment;
