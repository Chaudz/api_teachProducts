import { Schema, Types, model } from "mongoose";

enum STATUS {
  dangchoxacnhan,
  dangvanchuyen,
  thanhcong,
}

interface IOrder {
  order_date: Date;
  total_amount: number;
  order_status: number;
  order_phone: number;
  order_address: string;
  customer_id: Types.ObjectId;
}

const orderSchema = new Schema<IOrder>({
  order_date: { type: Date, default: Date.now },
  total_amount: { type: Number },
  order_status: { type: Number, default: STATUS.dangchoxacnhan }, //0
  order_phone: { type: Number },
  order_address: { type: String },
  customer_id: { type: Schema.Types.ObjectId },
});

const Order = model<IOrder>("orders", orderSchema);

export default Order;
