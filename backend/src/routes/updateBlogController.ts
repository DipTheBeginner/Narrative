import { Request, Response } from "express";
import { prisma } from "../prisma";
import { postSchema } from "@dipthebeginner/narrative-common";


export async function updateBlogController(req: Request, res: Response) {
    const parsedInput = postSchema.safeParse(req.body);
    const blogId = req.params.blogId;
    console.log("Blog id is =", blogId);

    if (!parsedInput.success) {
        res.status(404).json({
            msg: "Invalid post"
        })
        return;
    }


    const postExist = await prisma.post.findFirst({
        where: {
            id: blogId
        }
    })

    if (!postExist) {
        res.status(404).json({
            msg: "User not found"
        })
        return;
    }

    const blog = await prisma.post.update({
        where: {
            id: blogId,
            authorId: req.user?.id,
        },
        data: {
            title: req.body.title,
            content: req.body.content,
        }
    })

    if (!blog) {
        res.status(404).json({
            msg: "Post not updated"
        })
        return;
    }

    res.status(200).json({
        msg: "Post update successfull",
        blog
    })
    return;

}