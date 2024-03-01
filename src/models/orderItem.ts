import { Schema, Types, model } from "mongoose";

interface IOrderItem {
  quantity: number;
  price: number;
  order_id: Types.ObjectId;
  product_id: Types.ObjectId;
}

const orderItemSchema = new Schema<IOrderItem>({
  quantity: { type: Number },
  price: { type: Number },
  order_id: { type: Schema.Types.ObjectId },
  product_id: { type: Schema.Types.ObjectId },
});

const OrderItem = model<IOrderItem>("orderItems", orderItemSchema);

export default OrderItem;
