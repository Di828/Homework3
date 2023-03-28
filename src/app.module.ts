import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { User } from './users/user.model';
import { Profile } from './profiles/profile.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles-model';
import { AuthModule } from './auth/auth.module';
import { TextblockModule } from './textblock/textblock.module';
import { Textblock } from './textblock/textblock.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileInfo } from './files/fileinfo.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123123',
      database: 'learningdb',
      models: [User, Profile, Role, UserRoles, Textblock, FileInfo],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    ProfilesModule,
    RolesModule,
    AuthModule,
    TextblockModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
