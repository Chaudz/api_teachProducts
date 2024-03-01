import { Schema, Types, model } from "mongoose";

export interface ICart {
  quantity: number;
  user_id: Types.ObjectId;
  product_id: Types.ObjectId;
}

const cartSchema = new Schema<ICart>({
  quantity: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId },
  product_id: { type: Schema.Types.ObjectId },
});

const Cart = model<ICart>("carts", cartSchema);

export default Cart;
