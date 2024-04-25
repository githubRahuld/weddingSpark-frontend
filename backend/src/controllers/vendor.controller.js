import { Listing } from "../models/vendor_listing.js";
import { Vregister } from "../models/vendor.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";
import { Booking } from "../models/booking.models.js";

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
  const { name, email, password, cPassword, avatar } = req.body;

  if (
    [name, email, password, cPassword, avatar].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Fields are required");
  }

  const userFound = await Vregister.findOne({ email: email });

  if (userFound) {
    throw new ApiError(400, "You are already registered");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatarFile = await uploadOnCloudinary(avatarLocalPath);

  if (!avatarFile) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  //save in DB
  const user = await Vregister.create({
    name,
    email,
    password,
    cPassword,
    avatar: avatarFile.url,
  });

  //send data that we want to show in frontend
  const createdUser = await Vregister.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Vender registered successfull"));
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
    description
  );

  try {
    if (!req.files || !req.files.images) {
      throw new ApiError(400, "Images are required");
    }

    const images = req.files.images;

    // Array to store Cloudinary URLs of uploaded images
    const uploadedImagesUrls = [];

    // Upload each image to Cloudinary
    for (const image of images) {
      const uploadedImage = await uploadOnCloudinary(image.path);

      if (!uploadedImage) {
        throw new ApiError(500, "Failed to upload image");
      }

      uploadedImagesUrls.push(uploadedImage.url);
    }

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
      images: uploadedImagesUrls, // Array of image URLs
    });

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Vendor listed successfully"));
  } catch (error) {
    console.log("Error in vendor lising: ", error);
  }
});

const vendorBooking = asyncHandler(async (req, res) => {
  const userEmail = req.query.userEmail;
  console.log("user mail:", userEmail);

  try {
    const allBookings = await Booking.find({ vendorEmail: userEmail });

    return res
      .status(200)
      .json(new ApiResponse(200, allBookings, "Booking fetched"));
  } catch (error) {
    console.log("Error in fetching user booking data: ", error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    const user = await Vregister.findById(userId);
    if (!user) {
      throw new ApiError(404, "user not found");
    }

    const userData = await Vregister.findById({ _id: user._id }).select(
      "-password -cPassword -refreshToken"
    );
    // console.log("data: ", userData);

    return res
      .status(200)
      .json(new ApiResponse(200, userData, "User details found successfully"));
  } catch (error) {
    throw new ApiError(500, "something went wrong with user");
  }
});

const allListing = asyncHandler(async (req, res) => {
  const email = req.params.email;

  const allListing = await Listing.find({ email });
  console.log(allListing);

  if (allListing.length == 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "You are not listed yet"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allListing, "Fetched all listing by vendor d"));
});

export {
  vendorRegister,
  vendorLogin,
  vendorLogout,
  vendorListing,
  vendorBooking,
  getUser,
  allListing,
};
