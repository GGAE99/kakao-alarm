import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CookieKeys, JwtPayload, JwtPayloadWithRefreshToken, Tokens } from './constant/auth.type';
import { ERROR_MESSAGE } from './Error/auth.error.enum';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MyConfigType } from 'src/common/config/config.type';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserLoginDto } from 'src/user/dto/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService<MyConfigType>,
        private readonly userRepository: UserRepository
    ) { }

    async signin(
        userLoginDto: UserLoginDto,
        response: Response,
      ): Promise<void> {
        const { email, password } = userLoginDto;
        const user = await this.userRepository.getUserByEmail(email);
        const isValid = await bcrypt.compare(password, user.password);

        if (user && isValid) {
          const tokens = await this.getTokens(email);
          await this.updateRefreshToken(email, tokens.refreshToken);
          return this.setTokensToCookie(response, tokens);
        }
    
        throw new UnauthorizedException(ERROR_MESSAGE.INVALID_CREDENTIAL);
      }

    async refreshTokens(
        { email, refreshToken, }: Partial<JwtPayloadWithRefreshToken>,
        response: Response,
    ): Promise<void> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user || !user.refreshToken)
            throw new ForbiddenException(ERROR_MESSAGE.NOT_LOGINED);

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) throw new ForbiddenException(ERROR_MESSAGE.INVALID_TOKEN);

        const tokens = await this.getTokens(user.email);
        await this.updateRefreshToken(user.email, tokens.refreshToken);
        this.setTokensToCookie(response, tokens);
    }

    async logout(response: Response): Promise<void> {
        response.clearCookie(CookieKeys.ACCESS_TOKEN);
        response.clearCookie(CookieKeys.REFRESH_TOKEN);
    }

    async getTokens(email: string): Promise<Tokens> {
        const payload: JwtPayload = { email };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRE_SEC') + 's',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRE_SEC') + 's',
            }),
        ]);

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(id: string, refreshToken: string) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.updateRefreshToken(id, hashed);
    }

    setTokensToCookie(response: Response, tokens: Tokens): void {
        response.cookie(CookieKeys.ACCESS_TOKEN, tokens.accessToken, {
            httpOnly: true,
            expires: this.getExpiredDate(
                this.configService.get('ACCESS_TOKEN_EXPIRE_SEC'),
            ),
        });
        response.cookie(CookieKeys.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            expires: this.getExpiredDate(
                this.configService.get('REFRESH_TOKEN_EXPIRE_SEC'),
            ),
        });
    }

    getExpiredDate(expireSec: number): Date {
        return new Date(+new Date() + expireSec * 1000);
    }

}
