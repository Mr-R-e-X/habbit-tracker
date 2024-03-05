import express from "express";
import {
  registerController,
  signInController,
  profileController,
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middleware/logInCheck.js";

const userRoute = express.Router();

userRoute.route("/register").post(registerController);
userRoute.route("/sign-in").post(signInController);
userRoute.route("/profile").get(isLoggedIn, profileController);
export default userRoute;
