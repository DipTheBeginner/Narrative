import {  Router } from "express";
import { signUpController } from "../routes/signup";
import { signInController } from "../routes/signin";

const userRouter=Router();

userRouter.post("/signup",signUpController);
userRouter.post("/signin",signInController);

export default userRouter;