import express from "express";
import { getAllMessage, postMessage } from "../controllers/messageController.js";

const router = express.Router();

// add

router.post("/", postMessage);

// get

router.get("/:conversationId", getAllMessage);

export default router;
