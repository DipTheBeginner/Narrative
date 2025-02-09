import { Request, Response } from "express";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import { signinSchema } from "@dipthebeginner/narrative-common"


export async function signInController(req: Request, res: Response) {
    const parsedInput = signinSchema.safeParse(req.body);
    console.log("parsed input is=", parsedInput);
    if (!parsedInput.success) {
        res.status(404).json({
            msg: "Invalid Credentials"
        })
        return;
    }

    const body = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
        }
    })

    if (!user) {
        res.status(404).json({
            msg: "NOT FOUND"
        })
        return;
    }

    if(user.password!=body.password){
        res.status(404).json({
            msg:"password is wrong"
        })
    }

    else {
        const token = jwt.sign({ id: user.id }, "secret");
        res.json({
            msg: "user found",
            token,
        })
        return;

    }
}