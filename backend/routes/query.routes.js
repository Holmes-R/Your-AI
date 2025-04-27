import express from "express";
import queryController from "../controllers/query.controller.js";
const router = express.Router();

router.post("/question", queryController.chat);
router.post("/level",queryController.correctAnswers)

export default router;