import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { uuid } from "uuidv4";
import * as bcrypt from 'bcrypt';
import { User } from "./entity/user.entity";
import { ROLE } from "./constant/user.role";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserErrorEnum } from "src/common/Error/user.error.enum";

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async getAllUsers(): Promise<User[]> {
        const found = await this.find();
        if (!found) {
            throw new NotFoundException(UserErrorEnum.USER_NOT_FOUND);
        }
        return found;
    }

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        const { email, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = this.create({
            id: uuid(),
            email,
            password: hashedPassword,
            role: ROLE.USER,
            refreshToken: null,
        })
        if (!user) {
            throw new BadRequestException(UserErrorEnum.SIGN_UP_ERROR);
        }

        await this.save(user);
        return null;
    }

    async signIn(userLoginDto: UserLoginDto): Promise<void> {
        const { email, password } = userLoginDto;
        if (!email) {
            throw new BadRequestException(UserErrorEnum.NO_EMAIL_OR_PASSWORD);
        }
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new NotFoundException(`Can't find Board with id in signIn ${email}`);
        }
        return null;
    }

    async getUserByEmail(email: string): Promise<User> {
        const found = await this.findOne({
            where: { email }
        });
        if (!found) {
            throw new NotFoundException(`Can't find Board with id in Email ${email}`);
        }
        return found;
    }

    async updateRefreshToken(email:string, hashed:string): Promise<void> {
        const user = await this.getUserByEmail(email);
        user.refreshToken = hashed;
        await this.save(user);
    }
}