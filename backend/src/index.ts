
import express from "express";

import userRouter from "./controller/userController";


const app = express();

app.use(express.json());


app.use("/api/v1/user", userRouter)


// app.post("/api/v1/blog", async function (req, res, next) {



// })

// app.put("/api/v1/blog", async function (req, res) {

// })

// app.get("/api/v1/blog/:id", async function (req, res) {

// })




app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
