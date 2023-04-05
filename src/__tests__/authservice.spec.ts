import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProfilesModule } from '../profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Profile } from '../profiles/profile.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles-model';
import { Textblock } from '../textblock/textblock.model';
import { FileInfo } from '../files/fileinfo.model';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { TextblockModule } from '../textblock/textblock.module';
import { FilesModule } from '../files/files.module';

describe('AuthService tests', () => {
  let app: INestApplication;    

  beforeEach(async () => {    
    const moduleRef = await Test.createTestingModule({
        imports: [
            SequelizeModule.forRoot({
              dialect: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: '123123',
              database: 'testdb',
              models: [User, Profile, Role, UserRoles, Textblock, FileInfo],
              autoLoadModels: true
            }),                      
            UsersModule,
            ProfilesModule,
            RolesModule,
            AuthModule,
            TextblockModule,
            FilesModule,
          ]
      })          
      .compile();

      app = moduleRef.createNestApplication();
      await app.init();
  });

  let userToken;
  let login = Date.now().toString();
  let password = '123456';
  it(`Registration with correct data`, async () => {    
    const response = await request(app.getHttpServer())
    .post('/auth/registration')
    .send({
        login: login,
        email: `${login}@mail.ru`,
        password: password,
        firstName : 'qwe',
        secondName : 'qwe',
        surname : 'qwe',
        phone : '123',
        age : 25,
        country : 'qwe',
        city : 'qwe',
        adress : 'qwe'
    })   
    .expect(201);   

    userToken = response.body; 
    expect(userToken).toEqual({token : expect.any(String)});        
  })

  it(`Failure registration with incorrect data`, async () => {    
    await request(app.getHttpServer())
    .post('/auth/registration')
    .send({
        login: '',
        email: `${login}@mail.ru`,
        password: password,
        firstName : 'qwe',
        secondName : 'qwe',
        surname : 'qwe',
        phone : '123',
        age : 25,
        country : 'qwe',
        city : 'qwe',
        adress : 'qwe'
    })   
    .expect(400);               
  })

  it(`Login with correct data`, async () => {    
    const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
        loginOrEmail: login,    
        password: password
    })   
    .expect(200);   

    userToken = response.body; 
    expect(userToken).toEqual({token : expect.any(String)})
        
  })

  it(`Failure Login with incorrect data`, async () => {    
    const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
        loginOrEmail: login,    
        password: `wrongPassword`
    })   
    .expect(401);           
  })

  afterAll(async () => {    
    await app.close();
  });
});