import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { AddTextblockDto } from './dto/addtextblock.dto';
import { Textblock } from './textblock.model';

@Injectable()
export class TextblockService {

    constructor(@InjectModel(Textblock) private textblockRepository : typeof Textblock,
                private fileService : FilesService){}

    async getTextblockBySearchName(searchName : string){
        return await this.textblockRepository.findOne({where : {searchName : searchName}});                
    }

    async getTextblockByGroup(group : string){
        return await this.textblockRepository.findOne({where : {group : group}});                
    }

    async getAllTextblocks(){
        return await this.textblockRepository.findAll();
    }

    async addTextblock(textblockDto : AddTextblockDto, image : any){            
        const textblock = await this.textblockRepository.create(textblockDto);        
        const fileInfo = await this.fileService.addFileInfo({essenceTable : 'textblock', essenceId : textblock.textblock_id}, image);
        textblock.image = fileInfo.fileName;                
        await textblock.save();
        return textblock;
    }

    async updateTextblock(searchName : string, updateData : AddTextblockDto){
        let textblock = await this.textblockRepository.findOne({where : {searchName : searchName}});
        for (let key in updateData){
            textblock[key] = updateData[key];
        }

        textblock.save();
        return textblock;
    }

    async deleteTextblock(searchName : string){
        const deletedTextblock = await this.textblockRepository.findOne({where : {searchName}});
        await this.textblockRepository.destroy({where : {searchName}});        
        await this.fileService.deleteFilesForEssence('textblock', deletedTextblock.textblock_id);
        return {message : 'success'};
    }
}
