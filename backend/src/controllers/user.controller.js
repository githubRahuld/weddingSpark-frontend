import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import { Listing } from "../models/vendor_listing.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Booking } from "../models/booking.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

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

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cPassword } = req.body;

  try {
    if (
      [name, email, password, cPassword].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "Fields are required");
    }

    const userFound = await User.findOne({ email: email });

    if (userFound) {
      throw new ApiError(400, "You are already registered");
    }

    //save in DB
    const user = await User.create({
      name,
      email,
      password,
      cPassword,
    });

    //send data that we want to show in frontend
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User registered successfull"));
  } catch (error) {
    console.log("error at user registration: ", error);
    next(err);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new ApiError(400, "Email not registered");
    }

    const passwordCheck = await user.isPasswordCorrect(password);

    if (!passwordCheck) {
      throw new ApiError(400, "Invalid Password");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // so that cookies can't be modified at frontend
    const options = {
      httpOnly: true,
      secure: true,
    };

    //send data that we want to show in frontend
    const loginUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loginUser, accessToken, refreshToken, isLogin: true },
          "User Login successfull"
        )
      );
  } catch (err) {
    console.log("error at user login: ", err);
    // Pass the error to the error handling middleware
    next(err);
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  // In verifyJWT method we add user in req
  await User.findByIdAndUpdate(
    req.user?._id,
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
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const allVendors = asyncHandler(async (req, res) => {
  try {
    const data = await Listing.find({});
    // console.log(data);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Fetched all vendors data"));
  } catch (error) {
    console.log("Error at fetching vendors: ", error);
    next(error);
  }
});

const getVendor = asyncHandler(async (req, res) => {
  const { country, state, city, _id } = req.body;

  // Validate input (example using express-validator)
  // ... validation code here ...

  let data;

  try {
    if (city) {
      data = await Listing.find({ city });
    }
    if (_id) {
      data = await Listing.find({ _id });
    }

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No vendors found for the given city" });
    }

    console.log("Got vendor: ", data);

    return res
      .status(200)
      .json(new ApiResponse(200, data, "Fetched vendor data"));
  } catch (error) {
    console.error("Error in fetching vendor: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const bookingVendor = asyncHandler(async (req, res) => {
  const { name, email, location, fromDate, toDate, vendorName, vendorEmail } =
    req.body;

  try {
    console.log(
      "Booking input: ",
      name,
      email,
      fromDate,
      toDate,
      location,
      vendorName,
      vendorEmail
    );

    // Create the booking document
    const result = await Booking.create({
      name,
      email,
      fromDate,
      toDate,
      location,
      vendorName,
      vendorEmail,
      status: "Pending",
    });

    // console.log("Booking result: ", result);

    return res
      .status(200)
      .json(
        new ApiResponse(200, result, "You have successfully booked the vendor.")
      );
  } catch (error) {
    // Log the error
    console.error("Error while booking vendor: ", error);

    // Return an error response
    return res
      .status(500)
      .json(
        new ApiError(500, null, "An error occurred while booking the vendor.")
      );
  }
});

const userBooking = asyncHandler(async (req, res) => {
  const userEmail = req.query.userEmail;
  // console.log(userEmail);

  try {
    const allBookings = await Booking.find({ email: userEmail });

    return res
      .status(200)
      .json(new ApiResponse(200, allBookings, "Booking fetched"));
  } catch (error) {
    console.log("Error in fetching user booking data: ", error);
  }
});

const acceptBooking = asyncHandler(async (req, res) => {
  const id = req.params.bookingId;
  console.log("got id: ", id);

  const resId = await Booking.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "Confirmed",
      },
    },
    { new: true }
  );

  if (!resId) {
    throw new ApiError(404, "Invalid booking Id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resId, "Changed status to accept"));
});
const rejectBooking = asyncHandler(async (req, res) => {
  const id = req.params.bookingId;
  console.log("got id: ", id);

  const resId = await Booking.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "Rejected",
      },
    },
    { new: true }
  );

  if (!resId) {
    throw new ApiError(404, "Invalid booking Id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resId, "Changed status to Rejected"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  allVendors,
  getVendor,
  bookingVendor,
  userBooking,
  acceptBooking,
  rejectBooking,
};
