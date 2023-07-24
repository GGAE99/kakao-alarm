import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { MyConfigType } from 'src/common/config/config.type';
import { User } from 'src/user/entity/user.entity';
import { CookieKeys, JwtPayload } from '../constant/auth.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private configService: ConfigService<MyConfigType>,
  ) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req && req?.cookies[CookieKeys.ACCESS_TOKEN],
      ]),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userService.getUserByEmail(email);

    if (!user || !user.refreshToken) throw new UnauthorizedException();
    return user;
  }
}
