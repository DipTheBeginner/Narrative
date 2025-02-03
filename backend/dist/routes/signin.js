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
exports.signInController = signInController;
const userSchema_1 = require("../zod/userSchema");
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedInput = userSchema_1.userSchema.safeParse(req.body);
        if (!parsedInput.success) {
            res.status(404).json({
                msg: "Invalid Credentials"
            });
            return;
        }
        const body = req.body;
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            res.status(404).json({
                msg: "NOT FOUND"
            });
            return;
        }
        else {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, "secret");
            res.json({
                msg: "user found",
                jwt: token
            });
            return;
        }
    });
}
