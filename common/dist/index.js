"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.postSchema = void 0;
const zod_1 = require("zod");
exports.postSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    name: zod_1.z.string(),
});
