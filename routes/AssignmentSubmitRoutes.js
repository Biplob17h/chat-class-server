import express from "express";
import { assignmentResult, createAAssignmentSubmit } from "../controllers/AssignmentSubmitController.js";

const AssignmentSubmitRouter = express.Router();


AssignmentSubmitRouter.post('/create', createAAssignmentSubmit)
AssignmentSubmitRouter.patch('/result', assignmentResult)

export default AssignmentSubmitRouter;
