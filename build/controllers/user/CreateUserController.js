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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Received request:', req.body); // Log the received request
            try {
                const { name, email, password } = req.body;
                const createUserService = new CreateUserService_1.CreateUserService();
                const user = yield createUserService.execute({ name, email, password });
                const userResponse = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
                console.log('User created:', userResponse); // Log the created user
                return res.status(200).json({ message: "User created successfully", user: userResponse });
            }
            catch (error) {
                console.error('Error occurred:', error); // Log the error
                return res.status(500).json({ error: 'An error occurred while creating user.', details: error });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
