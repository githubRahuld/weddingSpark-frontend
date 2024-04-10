import { Router } from "express";
import {
  acceptBooking,
  allVendors,
  bookingVendor,
  getVendor,
  loginUser,
  logoutUser,
  registerUser,
  rejectBooking,
  userBooking,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/search").post(getVendor);
router.route("/all-vendors").get(allVendors);
router.route("/booking").post(bookingVendor);
router.route("/get-booking").get(userBooking);
router.route("/accept/:bookingId").patch(acceptBooking);
router.route("/reject/:bookingId").patch(rejectBooking);

export default router;
