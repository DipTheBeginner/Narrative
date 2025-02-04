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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogController = updateBlogController;
const postSchema_1 = require("../zod/postSchema");
const prisma_1 = require("../prisma");
const zod_1 = __importDefault(require("zod"));
function updateBlogController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Validate input including id
            const validationSchema = postSchema_1.postSchema.extend({
                id: zod_1.default.string()
            });
            const parsedInput = validationSchema.safeParse(req.body);
            if (!parsedInput.success) {
                return res.status(400).json({
                    msg: "Invalid input",
                    errors: parsedInput.error.issues
                });
            }
            const blog = yield prisma_1.prisma.post.update({
                where: {
                    id: req.body.id,
                    authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, // Ensures user owns the post
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                }
            });
            return res.status(200).json({
                msg: "Post updated successfully",
                blog
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    msg: "Post not found or unauthorized"
                });
            }
            return res.status(500).json({
                msg: "Internal server error"
            });
        }
    });
}
