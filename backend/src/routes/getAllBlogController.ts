import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function getAllBlogController(req:Request,res:Response){

    const blogs=await prisma.post.findMany({})
    
    res.status(202).json({
        msg:"All blogs are",
        blogs
    })
    return;
}