import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UserController } from '../user.controller';
import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entity/user.entity';
import { ROLE } from '../constant/user.role';

const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

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

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
        })
            .useMocker((token) => {
                const results = users;
                if (token === UserService) {
                    return { getAllUsers: jest.fn().mockResolvedValue(results) };
                }
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                    const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                    return new Mock();
                }
            })
            .compile();

        controller = moduleRef.get(UserController);
        userService = moduleRef.get<UserService>(UserService);
    });

    describe('getAllUsers', () => {
        it('should return an array of users', async () => {
            expect(await controller.getAllUsers()).toEqual(expect.arrayContaining(users));
        });
    });
});