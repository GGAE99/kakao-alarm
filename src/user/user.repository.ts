import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { uuid } from "uuidv4";
import * as bcrypt from 'bcrypt';
import { User } from "./entity/user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async login(email: string): Promise <User>{
        if (!email) {
            throw new BadRequestException('signId and signPassword must be provided');
          }

        const found = await this.findOne({where:{ email }});
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${email}`);
        }
        return found;
    }

    async createSign(createUserDto: CreateUserDto): Promise<User>{
        const {email, password} = createUserDto;

        const user = this.create({
            id: uuid(),
            email,
            password: await bcrypt.hash(password, 10),
        })

        await this.save(user);
        return user;
    }
}