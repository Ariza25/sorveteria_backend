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
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../services/user/AuthUserService");
class AuthUserController {
    constructor() {
        this.authUserService = new AuthUserService_1.AuthUserService();
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(`Received login request for email: ${email}`);
                const user = yield this.authUserService.execute({ email, password });
                console.log(`User ${email} logged in successfully`);
                return res.status(200).json({ message: "User logged successfully", user });
            }
            catch (error) {
                console.error('An error occurred while logging user:', error);
                return res.status(500).json({ error: 'An error occurred while logging user.' });
            }
        });
    }
}
exports.AuthUserController = AuthUserController;
