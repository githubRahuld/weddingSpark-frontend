import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Register } from "../models/user_register.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Vregister } from "../models/vendor_register.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  if (
    [name, email, password, cPassword].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fields are required");
  }

  const userFound = await Register.findOne({ email: email });

  if (userFound) {
    throw new ApiError(400, "You are already registered");
  }

  //save in DB
  const user = await Register.create({
    name,
    email,
    password,
    cPassword,
  });

  //send data that we want to show in frontend
  const createdUser = await Register.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfull"));
});

const registerVender = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  if (
    [name, email, password, cPassword].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fields are required");
  }

  const userFound = await Vregister.findOne({ email: email });

  if (userFound) {
    throw new ApiError(400, "You are already registered");
  }

  //save in DB
  const user = await Vregister.create({
    name,
    email,
    password,
    cPassword,
  });

  //send data that we want to show in frontend
  const createdUser = await Vregister.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Vender registered successfull"));
});

export { registerUser, registerVender };
