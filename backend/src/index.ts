import express from "express";

import userRouter from "./controller/userController";
import postRouter from "./controller/postController";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
