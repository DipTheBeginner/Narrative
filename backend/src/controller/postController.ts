import { Router } from "express"
import { authentication } from "../middleware/authenticator";
import { postBlogController } from "../routes/postBlogController";
import { updateBlogController } from "../routes/updateBlogController";
import { getBlogController } from "../routes/getBlogController";
import {  getAllBlogController } from "../routes/getAllBlogController";


const postRouter = Router();

postRouter.post("/blog", authentication, postBlogController);
postRouter.put("/blog/update/:blogId",authentication,updateBlogController);
postRouter.get("/blog/get/:blogId",authentication,getBlogController);
postRouter.get("/blog/getAll",authentication,getAllBlogController)



export default postRouter;

