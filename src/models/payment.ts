import { Schema, Types, model } from "mongoose";

export interface IPayment {
  payment_method: string;
  payment_status: number;
  order_id: Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>({
  payment_method: { type: String },
  payment_status: { type: Number },
  order_id: { type: Schema.Types.ObjectId },
});

const Payment = model<IPayment>("payments", paymentSchema);

export default Payment;
