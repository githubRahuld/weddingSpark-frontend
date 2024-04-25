import { Router } from "express";
import {
  acceptBooking,
  allVendors,
  bookingStatus,
  bookingVendor,
  getUser,
  getVendor,
  loginUser,
  logoutUser,
  registerUser,
  rejectBooking,
  userBooking,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/search").post(getVendor);
router.route("/all-vendors").get(allVendors);
router.route("/booking").post(bookingVendor);
router.route("/get-booking").get(userBooking);
router.route("/accept/:bookingId").patch(acceptBooking);
router.route("/reject/:bookingId").patch(rejectBooking);
router.route("/get-user/:userId").get(getUser);
router.route("/bookingStatus/:bookingId").get(bookingStatus);

export default router;
