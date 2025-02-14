"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controller/userController"));
const postController_1 = __importDefault(require("./controller/postController"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use("/api/v1/user", userController_1.default);
app.use("/api/v1/post", postController_1.default);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
