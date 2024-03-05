import express from "express";
import { homeController } from "../controllers/home.controller.js";
import userRoute from "./user.route.js";

const router = express.Router();

router.route("/").get(homeController);
router.use("/", userRoute);
export default router;
