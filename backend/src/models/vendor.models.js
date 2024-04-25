import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const venderRegisterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    cPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// incript password
venderRegisterSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.cPassword = await bcrypt.hash(this.cPassword, 10);
  next();
});

//custom methods to check the password
venderRegisterSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //return true or false
};

// syntax:- jwt.sign(payload, secretOrPrivateKey, [options, callback])
venderRegisterSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

venderRegisterSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },

    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Vregister = mongoose.model("Vregister", venderRegisterSchema);
