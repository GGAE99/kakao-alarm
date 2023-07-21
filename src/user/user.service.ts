import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async getAllUsers() {
        return this.userRepository
    }

    async signUp() {
        return 'Create user';
    }
}
