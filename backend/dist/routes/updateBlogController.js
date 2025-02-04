"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogController = updateBlogController;
const postSchema_1 = require("../zod/postSchema");
const prisma_1 = require("../prisma");
function updateBlogController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const parsedInput = postSchema_1.postSchema.safeParse(req.body);
        const blogId = req.params.blogId;
        console.log("Blog id is =", blogId);
        if (!parsedInput.success) {
            res.status(404).json({
                msg: "Invalid post"
            });
            return;
        }
        const postExist = yield prisma_1.prisma.post.findFirst({
            where: {
                id: blogId
            }
        });
        if (!postExist) {
            res.status(404).json({
                msg: "User not found"
            });
            return;
        }
        const blog = yield prisma_1.prisma.post.update({
            where: {
                id: blogId,
                authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
            data: {
                title: req.body.title,
                content: req.body.content,
            }
        });
        if (!blog) {
            res.status(404).json({
                msg: "Post not updated"
            });
            return;
        }
        res.status(200).json({
            msg: "Post update successfull",
            blog
        });
        return;
    });
}
