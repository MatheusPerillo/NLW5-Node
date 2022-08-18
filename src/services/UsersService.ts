import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService {
    async create(email: string) {
        const usersRepository = getCustomRepository(UsersRepository);
        
        // verify if user exists
        const userExists = await usersRepository.findOne({
            email,
        });

        // if doesn't exists, save in DB
        if(userExists){
            return userExists;
        }

        const user = usersRepository.create({
            email,
        });
        
        await usersRepository.save(user);

        // if exists, return user
        return user;
        
    }

}

export { UsersService };