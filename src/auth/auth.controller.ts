import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleOrAuthor } from './compose.guard';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/regestration.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './role-auth.decorator';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @Post('/login')
    login(@Body() loginDto : LoginDto){
        return this.authService.login(loginDto);
    }

    @Post('/registration')
    registration(@Body() registrationDto : RegistrationDto){        
        return this.authService.registration(registrationDto);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleOrAuthor)
    @Put('update/:id')
    updateUserById(@Param('id') id : number, @Body() registrationDto : RegistrationDto) {        
        return this.authService.updateUserById(id, registrationDto);
    }
}
