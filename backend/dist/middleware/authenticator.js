"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authentication(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(404).json({
            msg: "no token provided"
        });
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        if (!decoded) {
            res.status(404).json({
                msg: "User is not authorized"
            });
            return;
        }
        console.log("decode is =", decoded);
        req.user = decoded;
        next();
        return;
    }
    catch (err) {
        res.status(404).json({
            msg: "Unauthorized"
        });
        return;
    }
}
