import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  availability: boolean;
  preparationTime: number; // in minutes
  vendorName: string;
  vendorId?: mongoose.Schema.Types.ObjectId;
  featured: boolean;
  rating?: number;
  reviews?: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        "Burgers",
        "Pizza",
        "Chicken",
        "Ugali",
        "Samosas",
        "Drinks",
        "Desserts",
        "Other",
      ],
    },
    availability: { type: Boolean, default: true },
    preparationTime: { type: Number, default: 30 }, // minutes
    vendorName: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, availability: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ vendorId: 1 });

export default mongoose.model<IProduct>("Product", productSchema);
