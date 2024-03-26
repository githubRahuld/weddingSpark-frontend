import { Register } from "../models/user_register.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const logoutUser = asyncHandler(async (req, res) => {
  // In verifyJWT method we add user in req
  await Register.findByIdAndUpdate(
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

export { logoutUser };
