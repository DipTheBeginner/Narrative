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
exports.signUpController = signUpController;
const prisma_1 = require("../prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const narrative_common_1 = require("@dipthebeginner/narrative-common");
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsedInput = narrative_common_1.signupSchema.safeParse(req.body);
        if (!parsedInput.success) {
            res.status(404).json({
                msg: "Invalid Credentials"
            });
            return;
        }
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUser) {
            res.status(404).json({
                msg: "User already exists"
            });
            return;
        }
        const user = yield prisma_1.prisma.user.create({
            data: {
                email,
                password,
                name,
            }
        });
        console.log("User created is =", user);
        const tokenValue = {
            id: user.id,
            name: user.name,
        };
        const token = jsonwebtoken_1.default.sign(tokenValue, "secret");
        res.status(202).json({
            msg: "User Created success",
            jwt: token
        });
        return;
    });
}
