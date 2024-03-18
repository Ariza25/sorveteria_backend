import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {

        console.log('Received request:', req.body); // Log the received request

        try {
            const { name, email, password } = req.body;

            const createUserService = new CreateUserService();
            const user = await createUserService.execute({ name, email, password });

            const userResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            console.log('User created:', userResponse); // Log the created user

            return res.status(200).json({ message: "User created successfully", user: userResponse });
        } catch (error) {
            console.error('Error occurred:', error); // Log the error
            return res.status(500).json({ error: 'An error occurred while creating user.', details: error });

        }
    }
}

export { CreateUserController }