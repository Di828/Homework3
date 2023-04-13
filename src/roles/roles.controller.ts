import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private roleService : RolesService){}

    @Post()
    createRole(@Body() createRoleDto : CreateRoleDto){
        return this.roleService.createRole(createRoleDto);
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value : string ){
        return this.roleService.getRoleByValue(value);
    }

    @Delete('/:value')
    deleteRoleByValue(@Param('value') value : string){
        return this.roleService.deleteRoleByValue(value);
    }
}
