import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  orderId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  mpesaTransactionId?: string;
  mpesaPhone?: string;
  mpesaCheckoutRequestId?: string;
  resultCode?: string;
  resultDesc?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String as any,
      default: "mpesa",
      enum: ["mpesa", "card", "wallet"],
    },
    paymentStatus: {
      type: String as any,
      enum: ["unpaid", "pending", "paid", "failed"],
      default: "unpaid",
    },
    mpesaTransactionId: { type: String },
    mpesaPhone: { type: String },
    mpesaCheckoutRequestId: { type: String },
    resultCode: { type: String },
    resultDesc: { type: String },
  },
  { timestamps: true },
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ mpesaTransactionId: 1 });

export default mongoose.model<IPayment>("Payment", paymentSchema);
