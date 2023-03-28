import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IsAuthor } from 'src/auth/author.guard';
import { RoleOrAuthor } from 'src/auth/compose.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    //Для использования jwt-guard авторизации используем декоратор @UseGuards() с параметром JwtAuthGuard, который реализует интерфейс CanActivate
    //Для использования авторизации по ролям используем декоратор @Roles(), который создаем в модуле role-auth.decorator.ts и RolesGuard
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    
    @Get(':id')
    getUserById(@Param('id') id : number) {
        return this.usersService.getUserById(id);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    addRole(@Body() addRoleDto : AddRoleDto){
        return this.usersService.addRole(addRoleDto);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleOrAuthor)
    @Delete(':id')
    deleteUserById(@Param('id') id : number) {        
        return this.usersService.deleteUserById(id);
    }  
      
}
