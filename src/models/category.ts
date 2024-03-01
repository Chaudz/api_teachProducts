import { Schema, model } from "mongoose";

export interface ICategory {
  category_name: string;
  created_at?: Date;
  updated_at: Date;
}

const categorySchema = new Schema<ICategory>({
  category_name: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = model<ICategory>("categories", categorySchema);

export default Category;
