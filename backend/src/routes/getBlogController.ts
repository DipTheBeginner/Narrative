import { Request, Response } from "express";
import { prisma } from "../prisma";


export async function getBlogController(req:Request,res:Response){
    const blogId=req.params.blogId;
    
    const blogExist=await prisma.post.findFirst({
        where:{
            id:blogId,
        }
    })

    if(!blogExist){
        res.status(404).json({
            msg:"Invalid post Request"
        })
        return;
    }

    res.status(200).json({
        msg:"Your requested Blog is",
        blogExist
    })
    return;

}