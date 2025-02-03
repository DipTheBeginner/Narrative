import { Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { userSchema } from "../zod/userSchema";

export async function signUpController(req: Request, res: Response) {
    const parsedInput = userSchema.safeParse(req.body);

    if (!parsedInput.success) {
         res.status(404).json({
            msg: "Invalid Credentials"
        })
        return;
    }

    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (existingUser) {
         res.status(404).json({
            msg: "User already exists"
        })
        return;
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
        }
    })

    const token = jwt.sign({ id: user.id }, "secret");

     res.status(202).json({
        msg: "User Created success",
        jwt: token
    })
    return;
}