import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports : [
    // Регистрация Jwt модуля
    JwtModule.register({
      secret : process.env.PRIVATE_KEY || 'Secret',      
      signOptions : {
        expiresIn : '24h'
      }
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => ProfilesModule),
  ],
  exports : [
    AuthService, 
    JwtModule
  ]
})
export class AuthModule {}
