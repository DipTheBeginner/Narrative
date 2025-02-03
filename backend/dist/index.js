"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controller/userController"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/user", userController_1.default);
// app.post("/api/v1/blog", async function (req, res, next) {
// })
// app.put("/api/v1/blog", async function (req, res) {
// })
// app.get("/api/v1/blog/:id", async function (req, res) {
// })
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
