import { Router } from "express";
import { registerVender } from "../controllers/register.controller.js";
import { venderLoginUser } from "../controllers/login.controller.js";

const router = Router();

router.route("/register").post(registerVender);
router.route("/login").post(venderLoginUser);

export default router;
