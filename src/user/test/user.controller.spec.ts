import { Test } from '@nestjs/testing';
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { UserRepository } from "../user.repository";
import { AuthService } from "src/auth/auth.service";
import { User } from "../entity/user.entity";
import { ROLE } from "../constant/user.role";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userRepository: UserRepository;
    let authService: AuthService;
    let jwtService: JwtService;
    let configService : ConfigService;

    beforeEach(async () => {
        // test 모듈 생성
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                UserRepository,
                AuthService,
                JwtService,
                ConfigService,
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
        authService = moduleRef.get<AuthService>(AuthService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        configService = moduleRef.get<ConfigService>(ConfigService);
    });

    const dummyUser: User = new User();
    dummyUser.id = '1';
    dummyUser.email = 'test@example.com';
    dummyUser.password = 'hashed_password';
    dummyUser.role = ROLE.ADMIN; // ROLE.ADMIN 또는 다른 ROLE 값으로 설정
    dummyUser.refreshToken = null;

    const dummyUserTwo: User = new User();
    dummyUserTwo.id = '2';
    dummyUserTwo.email = 'test2@example.con';
    dummyUserTwo.password = 'hashed_password';
    dummyUserTwo.role = ROLE.USER; // ROLE.ADMIN 또는 다른 ROLE 값으로 설정
    dummyUserTwo.refreshToken = null;

    // 'dummyUser'를 단일 요소를 가지는 배열로 만들기
    const users: User[] = [dummyUser, dummyUserTwo];

    describe('getAllUsers', () => {
        it('should return an array of users', async () => {
            //const result = ['test'];
            const result: Promise<User[]> = Promise.resolve(users);
            jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);
            expect(await userController.getAllUsers()).toEqual(expect.arrayContaining(users));
        });
    });
});
