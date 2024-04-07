import express from "express";
import {
  addStudentToClass,
  createAClass,
  createAHomeWork,
  findAllClass,
  findClassById,
  getStudentClass,
  promoteAStudentToCoTeacher,
} from "../controllers/classControllers.js";

const classRouter = express.Router();

classRouter.post("/create", createAClass);

classRouter.get("/singleClass/:id", findClassById);
classRouter.get("/all", findAllClass);
classRouter.get("/studentClass", getStudentClass);

classRouter.put("/addStudent", addStudentToClass);

classRouter.patch("/coStudent", promoteAStudentToCoTeacher);
classRouter.patch("/homework", createAHomeWork);

export default classRouter;
