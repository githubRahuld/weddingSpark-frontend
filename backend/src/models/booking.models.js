import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema.model(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
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

export const Booking = mongoose.model("booking", bookingSchema);
