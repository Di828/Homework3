import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository : typeof Profile){}

    async getProfileById(profile_id : number){
        return await this.profileRepository.findOne({where:{profile_id : profile_id}});
    }

    async getAllProfiles(){

    }

    async createProfile(createProfileDto : CreateProfileDto){
        const profile = await this.profileRepository.create(createProfileDto);
        return profile;
    }
}