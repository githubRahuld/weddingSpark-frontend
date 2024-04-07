import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
