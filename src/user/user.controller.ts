import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get('allUsers')
    async getAllUsers() : Promise<User[]>{
        return await this.userService.getAllUsers();
    }

    @Post('signUp')
    async signUp(@Body() createUserDto: CreateUserDto) : Promise<void> {
        return await this.userService.signUp(createUserDto);
    }

    @Post('signIn')
    async signIn(@Body() userLoginDto: UserLoginDto) : Promise<User> {
        return await this.userService.signIn(userLoginDto);
    }
}
