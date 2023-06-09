import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/regestration.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AuthService {
    
    constructor(private userService : UsersService,
                private profileService : ProfilesService,                
                private jwtService : JwtService){}

    async login(loginDto : LoginDto){        
        const user = await this.validateUser(loginDto);
        return await this.generateToken(user);
    }
    
    async registration(registrationDto : RegistrationDto){             
        
        if (await this.userOrEmailExist(registrationDto)){
            throw new HttpException('Логин или емейл уже занят', HttpStatus.BAD_REQUEST);
        }
        
        const salt = 5; 
        const hashPassword = await bcrypt.hash(registrationDto.password, salt);

        const user = await this.userService.createUser({...registrationDto, password : hashPassword});
        await this.profileService.createProfile({...registrationDto, user_id : user.user_id});
        
        return await this.generateToken(user);
    }

    async updateUserById(id : number, updateDto : UpdateDto){
        const user = await this.userService.getUserById(id);

        if (updateDto.login != user.login && await this.loginExists(updateDto.login)){            
            throw new HttpException('Логин на который вы хотите сменить ваш текущий уже занят', HttpStatus.BAD_REQUEST);
        }
        
        if (updateDto.email != user.email && await this.emailExists(updateDto.email)){
            throw new HttpException('Email на который вы хотите сменить ваш текущий уже занят', HttpStatus.BAD_REQUEST);
        }

        const profile = await this.profileService.getProfileById(user.profile.profile_id);
        for (let key in updateDto){
            user[key] = updateDto[key];
            profile[key] = updateDto[key];
        }        

        await profile.save();
        await user.save();                
        return await this.userService.getUserById(id);
    }

    private async loginExists(login : string){
        const candidate = await this.userService.getUserByLogin(login);
        if (candidate){
            return true;
        }

        return false;
    }

    private async emailExists(email : string){
        const candidate = await this.userService.getUserByEmail(email);
        if (candidate){
            return true;
        }

        return false;
    }

    private async userOrEmailExist(registrationDto : RegistrationDto){
        const candidate = await this.userService.getUserByLoginOrEmail(registrationDto.login, registrationDto.email);
        if (candidate){
            return true;
        }

        return false;
    }
    //Генерация токена jwt сервисом
    private async generateToken(user : User){        
        const payload = {email : user.email, user_id : user.user_id, roles : user.roles};
        return {
            token : this.jwtService.sign(payload)
        }
    }

    private async validateUser(loginDto : LoginDto) {
        const user = await this.userService.getUserByLoginOrEmail(loginDto.loginOrEmail, loginDto.loginOrEmail);
        if (!user){
            throw new UnauthorizedException('Неверный логин или емейл');
        }

        const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordEquals){
            throw new UnauthorizedException('Неверный пароль');
        }

        return user;
    }
}
