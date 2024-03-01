import { Schema, model, Types } from "mongoose";

export interface IProduct {
  _id: Types.ObjectId;
  product_name: string;
  price: number;
  description: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  category_id: Types.ObjectId;
  brand_id: Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  product_name: { type: String },
  price: { type: Number },
  description: { type: String },
  quantity: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  category_id: { type: Schema.Types.ObjectId },
  brand_id: { type: Schema.Types.ObjectId },
});

const Product = model<IProduct>("products", productSchema);

export default Product;
