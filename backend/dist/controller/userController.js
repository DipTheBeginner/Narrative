"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_1 = require("../routes/signup");
const signin_1 = require("../routes/signin");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", signup_1.signUpController);
userRouter.post("/signin", signin_1.signInController);
exports.default = userRouter;
