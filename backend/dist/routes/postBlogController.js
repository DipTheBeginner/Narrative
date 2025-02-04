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
exports.postBlogController = postBlogController;
const postSchema_1 = require("../zod/postSchema");
const prisma_1 = require("../prisma");
function postBlogController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log("req user is ", req.user);
        const parsedInput = postSchema_1.postSchema.safeParse(req.body);
        if (!parsedInput.success) {
            res.status(404).json({
                msg: "Invalid Post"
            });
            return;
        }
        const result = yield prisma_1.prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            }
        });
        console.log("result is ", result);
        if (result) {
            const finalData = yield prisma_1.prisma.post.update({
                where: {
                    id: result.id,
                },
                data: {
                    published: true,
                }
            });
        }
        res.status(200).json({
            msg: "Post Created Successfully",
            data: result,
        });
        return;
    });
}
