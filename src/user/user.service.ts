import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async getAllUsers() : Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async signUp(createUserDto: CreateUserDto) : Promise<void> {
        await this.userRepository.signUp(createUserDto);
        return null;
    }

    async signIn(userLoginDto: UserLoginDto) : Promise<User> {
        return await this.userRepository.signIn(userLoginDto);
    }
}
