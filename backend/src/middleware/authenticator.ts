import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export function authentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(404).json({
            msg: "no token provided"
        })
        return;

    }

    try {


        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        if(!decoded){
            res.status(404).json({
                msg:"User is not authorized"
            })

            return;
        }
        req.user=decoded as authUser;

        console.log("decode is ",decoded);
        next();
        return;
        
    } catch (err) {
        res.status(404).json({
            msg: "Unauthorized"
        })
        return;
    }


}