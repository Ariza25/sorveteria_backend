import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken';

interface AuthRequestProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password}: AuthRequestProps) {
        const prisma = new PrismaClient();

        console.log(`Looking for user with email: ${email}`);
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (!user) {
            console.error(`User with email: ${email} not found`);
            throw new Error("User not found");
        }

        if (!user.password) {
            console.error(`Password not found for user with email: ${email}`);
            throw new Error("Password not found");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            console.error(`Incorrect password for user with email: ${email}`);
            throw new Error("Incorrect password");
        }

        //gerar token JWT
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("JWT_SECRET is not defined");
            throw new Error("JWT_SECRET is not defined");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        );
        console.log(`User with email: ${email} logged in successfully`);
        return { id: user.id, name: user.name, email: user.email, token: token }
    }
}

export { AuthUserService }