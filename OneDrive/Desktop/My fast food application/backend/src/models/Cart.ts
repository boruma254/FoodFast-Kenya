import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
  },
  { _id: false },
);

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    total: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<ICart>("Cart", cartSchema);
