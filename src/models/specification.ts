import { Schema, Types, model } from "mongoose";

export interface ISpecification {
  specification_name: string;
  specification_value: string;
  payment_status: number;
  product_id: Types.ObjectId;
}

const specificationSchema = new Schema<ISpecification>({
  specification_name: { type: String },
  specification_value: { type: String },
  payment_status: { type: Number },
  product_id: { type: Schema.Types.ObjectId },
});

const Specification = model<ISpecification>(
  "specifications",
  specificationSchema
);

export default Specification;
