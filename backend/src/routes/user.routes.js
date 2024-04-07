import { Router } from "express";
import {
  allVendors,
  getVendor,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/all-vendors").get(allVendors);
router.route("/search").post(getVendor);

export default router;
