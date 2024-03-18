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
exports.AuthUserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
class AuthUserService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Looking for user with email: ${email}`);
            const user = yield prisma.user.findFirst({ where: { email: email } });
            if (!user) {
                console.error(`User with email: ${email} not found`);
                throw new Error("User not found");
            }
            if (!user.password) {
                console.error(`Password not found for user with email: ${email}`);
                throw new Error("Password not found");
            }
            const passwordMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatch) {
                console.error(`Incorrect password for user with email: ${email}`);
                throw new Error("Incorrect password");
            }
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("JWT_SECRET is not defined");
                throw new Error("JWT_SECRET is not defined");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, secret, {
                subject: user.id,
                expiresIn: '30d'
            });
            console.log(`User with email: ${email} logged in successfully`);
            return { id: user.id, name: user.name, email: user.email, token: token };
        });
    }
}
exports.AuthUserService = AuthUserService;
