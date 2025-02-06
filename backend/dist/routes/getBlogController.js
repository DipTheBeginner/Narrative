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
exports.getBlogController = getBlogController;
const prisma_1 = require("../prisma");
function getBlogController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogId = req.params.blogId;
        const blogExist = yield prisma_1.prisma.post.findFirst({
            where: {
                id: blogId,
            }
        });
        if (!blogExist) {
            res.status(404).json({
                msg: "Invalid post Request"
            });
            return;
        }
        res.status(200).json({
            msg: "Your requested Blog is",
            blogExist
        });
        return;
    });
}
