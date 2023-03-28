import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { Profile } from './profile.model';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  // Импортируем юзер модуль, т.к. будем использовать его для создания пользователя
  imports : [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Profile, User])
  ],    
  exports : [
    ProfilesService
  ]
})
export class ProfilesModule {}
