import express from "express";
import { getConvUser, postNewConv } from "../controllers/conversationController.js";

const router = express.Router();

// new conv
router.post("/", postNewConv);

// get conv user
router.get("/:id", getConvUser);

export default router;
