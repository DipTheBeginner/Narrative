import { Request, Response } from "express";
import { prisma } from "../prisma";
import { postSchema } from "@dipthebeginner/narrative-common";


export async function postBlogController(req: Request, res: Response) {
    console.log("req user is ", req.user);
    const parsedInput = postSchema.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(404).json({
            msg: "Invalid Post"
        })
        return;
    }

    const result = await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            authorId: Number(req.user?.id),
        }
    })

    console.log("result is ", result);

    if (result) {
        const finalData = await prisma.post.update({
            where: {
                id: result.id,

            },
            data: {
                published: true,

            }
        })
    }
  
    res.status(200).json({
        msg: "Post Created Successfully",
        data: result,
    })
    return;

}