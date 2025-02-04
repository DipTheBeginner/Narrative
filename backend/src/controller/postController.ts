import { Router } from "express"
import { authentication } from "../middleware/authenticator";
import { postBlogController } from "../routes/postBlogController";
import { updateBlogController } from "../routes/updateBlogController";


const postRouter = Router();

postRouter.post("/blog", authentication, postBlogController);
postRouter.put("/blog/update/:blogId",authentication,updateBlogController);




export default postRouter;

