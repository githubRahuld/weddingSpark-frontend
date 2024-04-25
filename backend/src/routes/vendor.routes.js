import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  allListing,
  getUser,
  vendorBooking,
  vendorListing,
  vendorLogin,
  vendorLogout,
  vendorRegister,
} from "../controllers/vendor.controller.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), vendorRegister);
router.route("/login").post(vendorLogin);
router.route("/logout").post(vendorLogout);
router.route("/get-booking").get(vendorBooking);
router.route("/get-user/:userId").get(getUser);
router.route("/all-listing/:email").get(allListing);

// router.route("/listing").post(upload.single("image", vendorListing));
router.route("/listing").post(
  upload.fields([
    // upload images
    // used middlware
    {
      name: "images",
      maxCount: 3,
    },
  ]),
  vendorListing
);

export default router;
