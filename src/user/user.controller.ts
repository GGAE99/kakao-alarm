import { Controller, Get, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { RefreshTokenGuard } from 'src/auth/guard/refreshToken.guard';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('signUp')
    async signUp(
        @Body() createUserDto: CreateUserDto,
    ): Promise<void> {
        return await this.userService.signUp(createUserDto);
    }

    @Post('signIn')
    async signIn(
        @Body() userLoginDto: UserLoginDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        return await this.userService.signIn(userLoginDto, response);
    }

    @UseGuards(AccessTokenGuard)
    @Get('allUsers')
    async getAllUsers( ): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
    
    @UseGuards(RefreshTokenGuard)
    @Post('refresh/test')
    async refreshTest(
        @Req() req: Request,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        return await this.userService.refreshTest(req, response);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    async logout(
        @Req() req,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        return this.userService.logout(req.user, response);
    }

}
