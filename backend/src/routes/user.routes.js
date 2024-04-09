import { Router } from "express";
import {
  allVendors,
  bookingVendor,
  getVendor,
  loginUser,
  logoutUser,
  registerUser,
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

export default router;
