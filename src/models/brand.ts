import { Schema, model } from "mongoose";

export interface IBrand {
  brand_name: string;
}

const brandSchema = new Schema<IBrand>({
  brand_name: { type: String },
});

const Brand = model<IBrand>("brands", brandSchema);

export default Brand;
