import express from "express";
import { createAUser, updateUser, userLogin, getAllUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', createAUser)
userRouter.post('/signin', userLogin)

userRouter.get('/allUser', getAllUser)

userRouter.patch('/updateUser', updateUser)
export default userRouter;
