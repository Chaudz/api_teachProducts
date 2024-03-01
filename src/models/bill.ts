import { Schema, Types, model } from "mongoose";

export interface IBill {
  bill_date: Date;
  total_amount: number;
  order_id: Types.ObjectId;
}

const billSchema = new Schema<IBill>({
  bill_date: { type: Date, default: Date.now },
  total_amount: { type: Number },
  order_id: { type: Schema.Types.ObjectId },
});

const Bill = model<IBill>("bills", billSchema);

export default Bill;
