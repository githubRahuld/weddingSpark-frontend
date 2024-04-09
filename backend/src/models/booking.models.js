import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    vendorEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
