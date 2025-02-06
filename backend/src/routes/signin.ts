import { Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { userSchema } from "@dipthebeginner/narrative-common";



export async function signInController(req:Request, res:Response) {
    const parsedInput = userSchema.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(404).json({
            msg: "Invalid Credentials"
        })
        return;
    }

    const body = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    if (!user) {
        res.status(404).json({
            msg: "NOT FOUND"
        })
        return;
    }

    else {
        const token = jwt.sign({ id: user.id }, "secret");
        res.json({
            msg: "user found",
            jwt: token
        })
        return;

    }
}