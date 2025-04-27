import express from "express";
import userController from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/profile", userController.profile);

export default router;

