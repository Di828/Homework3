import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {

    constructor(private profilesService : ProfilesService){}
    
    @Roles('USER', 'ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:id')
    getProfileById(@Param('id') id : number){
        return this.profilesService.getProfileById(id);
    }
}
