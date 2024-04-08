import { Listing } from "../models/vendor_listing.js";
import { Vregister } from "../models/vendor.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const vender_generateAccessAndRefreshToken = async (userId) => {
  try {
    // generating access and refresh tokens and saving them to the user document in MongoDB using Mongoose.
    const user = await Vregister.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.accessToken = accessToken; //to delete

    await user.save({ validateBeforeSave: false });
    //validateBeforeSave:false = jisse validation check na ho kyouki we didnt give all fields here

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const vendorRegister = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  try {
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
  } catch (error) {
    console.log("error in vendor registration: ", error);
    next(error);
  }
});

// Vendor Login
const vendorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if ([email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await Vregister.findOne({ email });

    if (!user) {
      throw new ApiError(400, "Email not registered");
    }

    const passwordCheck = await user.isPasswordCorrect(password);

    if (!passwordCheck) {
      throw new ApiError(400, "Invalid Password");
    }

    const { accessToken, refreshToken } =
      await vender_generateAccessAndRefreshToken(user._id);

    //send data that we want to show in frontend
    const loginUser = await Vregister.findById(user._id).select(
      "-password -refreshToken"
    );

    // so that cookies can't be modified at frontend
    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log("loginUser:", loginUser);
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loginUser, accessToken, refreshToken },
          "Vendor Login successfull"
        )
      );
  } catch (error) {
    console.log("Error in vendor login: ", error);
  }
});

const vendorLogout = asyncHandler(async (req, res) => {
  // In verifyJWT method we add user in req

  // console.log("User logout reqq: ", req.user?._id);

  try {
    await Vregister.findByIdAndUpdate(
      req.vendor?._id,
      {
        $unset: {
          // update in database
          refreshToken: 1,
        },
      },
      {
        new: true, // so that we get updated values
      }
    );

    // now remove from cache

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Vendor logged Out"));
  } catch (error) {
    console.log("Error in vendor Logout: ", error);
    next(error);
  }
});

const vendorListing = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    category,
    country,
    state,
    city,
    price,
    contact,
    description,
    image,
  } = req.body;

  console.log(
    "Values: ",
    name,
    email,
    category,
    country,
    state,
    city,
    price,
    contact,
    description,
    image
  );
  // if (
  //   [category, country, state, city, price, contact].some(
  //     (field) => field?.trim() === ""
  //   )
  // ) {
  //   throw new ApiError(400, "Email and password are required");
  // }

  try {
    const imageLocalPath = req.files?.image[0]?.path;

    if (!imageLocalPath) throw new ApiError(404, "Image is rquired");

    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage) throw new ApiError(404, "Image is required");

    const result = await Listing.create({
      name,
      email,
      category,
      country,
      state,
      city,
      price,
      contact,
      description,
      image: uploadedImage.url,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Vendor listed successfully"));
  } catch (error) {
    console.log("Error in vendor lising: ", error);
  }
});

export { vendorRegister, vendorLogin, vendorLogout, vendorListing };
