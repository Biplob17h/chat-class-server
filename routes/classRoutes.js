import express from "express";
import {
  addStudentToClass,
  createAClass,
  createAHomeWork,
  deleteAClass,
  findAllClass,
  findClassById,
  getStudentClass,
  leaveAClass,
  promoteAStudentToCoTeacher,
} from "../controllers/classControllers.js";

const classRouter = express.Router();

classRouter.post("/create", createAClass);

classRouter.get("/singleClass/:id", findClassById);
classRouter.get("/all", findAllClass);
classRouter.get("/studentClass", getStudentClass);
classRouter.get("/leave", leaveAClass);



classRouter.put("/addStudent", addStudentToClass);

classRouter.patch("/coStudent", promoteAStudentToCoTeacher);
classRouter.patch("/homework", createAHomeWork);


classRouter.delete("/delete", deleteAClass);

export default classRouter;
