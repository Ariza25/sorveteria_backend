import { ListUserService } from "../../services/user/ListUserService";
import { Request, Response } from "express";

class ListUserController {
    async handle(req: Request, res: Response) {

        try{
            const listUserService = new ListUserService();

            const users = await listUserService.execute();
    
            const filteredUsers = users.map(user => {
                const { password, ...otherFields } = user;
                return otherFields;
            });
    
            return res.status(200).json(filteredUsers);
        }catch(err){
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message, name: err.name });
            } else {
                return res.status(500).json({ message: String(err) });
            }
        }
    }
}

export { ListUserController}