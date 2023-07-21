import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('allUsers')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post('signUp')
    async signUp() {
        return this.userService.signUp();
    }


}
