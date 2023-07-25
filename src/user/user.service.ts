import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';
import { JwtPayloadWithRefreshToken, UserPayload } from 'src/auth/constant/auth.type';

@Injectable()
export class UserService {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        private readonly userRepository: UserRepository
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        await this.userRepository.signUp(createUserDto);
        return null;
    }

    async signIn(userLoginDto: UserLoginDto, response: Response): Promise<void> {
        await this.authService.userSignIn(userLoginDto, response);
        return await this.userRepository.signIn(userLoginDto);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAllUsers();
    }

    async refreshTest(req, response: Response): Promise<void> {
        return await this.authService.refreshTokens(req.user, response);
    }

    async logout(
        { email, refreshToken, }: Partial<JwtPayloadWithRefreshToken>,
        res: Response,
    ): Promise<void> {
        await this.authService.logout(res);
        await this.userRepository.updateRefreshToken(email, null);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.getUserByEmail(email);
    }

}
