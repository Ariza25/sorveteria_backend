import {Request, Response} from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController {
    async handle(req: Request, res: Response){

        try{
            const {email, password} = req.body as {email: string, password: string};

            console.log(`Received login request for email: ${email}`);

            const authUserService = new AuthUserService();
            const user = await authUserService.execute({email, password});
    
            console.log(`User ${email} logged in successfully`);

            return res.status(200).json({ message: "User logged successfully", user});
        }catch(error){
            console.error('An error occurred while logging user:', error);
            return res.status(500).json({ error: 'An error occurred while logging user.', details: error });
        }
    }
}

export {AuthUserController}