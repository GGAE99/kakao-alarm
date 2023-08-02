import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { UserService } from "../user.service";
import { Test } from "@nestjs/testing";
import { UserModule } from "../user.module";
import { User } from "../entity/user.entity";
import { ROLE } from "../constant/user.role";

jest.mock("../user.module");
jest.mock("../user.service");

describe('User', () => {

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

    const searchedUser: User = new User();
    searchedUser.id = '1';
    searchedUser.email = 'test@example.com';
    searchedUser.password = 'hashed_password';
    searchedUser.role = ROLE.ADMIN; // ROLE.ADMIN 또는 다른 ROLE 값으로 설정
    searchedUser.refreshToken = null;

    let app: INestApplication;
    let userService = { getAllUser: () => users };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
        }).overrideProvider(UserService)
            .useValue(userService)
            .compile();

        app = moduleRef.createNestApplication(); // 런타임 환경 인스턴스화
        await app.init();
        console.log("app initialized:", app);
    });

    it('/GET allUsers', () => {
        return request(app.getHttpServer())
            .get('user/allUsers') // 요청 경로를 '/allUsers'로 수정
            .expect(200)
            .expect({
                data: userService.getAllUser(),
            });
    });

    it('/POST getUserByEmail', () => {
        return request(app.getHttpServer())
            .post('user/getUserByEmail') // 요청 경로를 '/getUserByEmail'로 수정
            .send({ email: 'test@example.com' })
            .expect(200)
            .expect({
                data: searchedUser,
            });
    });

    afterAll(async () => {
        await app.close();
    });
})