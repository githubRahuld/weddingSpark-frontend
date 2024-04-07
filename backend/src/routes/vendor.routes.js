import { Router } from "express";
import { vendorVerifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  vendorListing,
  vendorLogin,
  vendorLogout,
  vendorRegister,
} from "../controllers/vendor.controller.js";

const router = Router();

router.route("/register").post(vendorRegister);
router.route("/login").post(vendorLogin);
router.route("/logout").post(vendorLogout);

// router.route("/listing").post(upload.single("image", vendorListing));
router.route("/listing").post(
  upload.fields([
    // upload images
    // used middlware
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  vendorListing
);

export default router;
