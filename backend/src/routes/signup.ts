import { Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { signupSchema} from "@dipthebeginner/narrative-common";

export async function signUpController(req: Request, res: Response) {
    const parsedInput = signupSchema.safeParse(req.body);

    if (!parsedInput.success) {
        res.status(404).json({
            msg: "Invalid Credentials"
        })
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

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
            name,
        }
    })

    console.log("User created is =", user);

    const tokenValue = {
        id: user.id,
        name: user.name,
    }

    const token = jwt.sign(tokenValue, "secret");

    res.status(202).json({
        msg: "User Created success",
        jwt: token
    })
    return;
}