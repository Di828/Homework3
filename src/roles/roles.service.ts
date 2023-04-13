import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository : typeof Role){}

    async createRole(createRoleDto : CreateRoleDto){
        const role = await this.roleRepository.create(createRoleDto);
        return role;
    }

    async getRoleByValue(value : string){
        const role = await this.roleRepository.findOne({where : {value}});   
        if (!role)     {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        return role
    }

    async deleteRoleByValue(value : string){
        const role = await this.roleRepository.findOne({where : {value}})
        if (!role) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        await this.roleRepository.destroy({where : {value}})
        return 
    }
}
