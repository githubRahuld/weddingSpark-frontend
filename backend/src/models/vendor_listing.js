import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
    images: [
      {
        type: String, // Assuming image URLs will be stored
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
