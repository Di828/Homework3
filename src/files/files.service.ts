import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { FileInfo } from './fileinfo.model';
import { AddFileDto } from './dto/addfile.dto';
import { Op } from 'sequelize';

@Injectable()
export class FilesService {

    constructor (@InjectModel(FileInfo) private fileInfoRepository : typeof FileInfo){}

    async getFilesForEssenceById(essenceTable : string, essenceId : number) {
        const files = await this.fileInfoRepository.findAll({where : {essenceTable, essenceId}});
        return files;
    }

    async addFileInfo(addFileDto : AddFileDto, uploadedFile : any) {            
        const fileName = await this.createFile(uploadedFile);
        const fileInfo = await this.fileInfoRepository.create({...addFileDto, fileName : fileName});
        return fileInfo;
    }

    async deleteFilesForEssence(essenceTable : string, essenceId : number) {
        const filesToDelete = await this.fileInfoRepository.findAll({where : {
            [Op.and] : [                                
                {essenceTable : essenceTable},
                {essenceId : essenceId},                
            ]             
        }});
        
        filesToDelete.forEach(element => {
            const filePath = path.resolve(__dirname, '..', 'static');
            const fileName = element.fileName;            
            fs.rmSync(path.join(filePath, fileName));
        });

        await this.fileInfoRepository.destroy({where : {
            [Op.and] : [                                
                {essenceTable : essenceTable},
                {essenceId : essenceId},                
            ]             
        }});   
    }

    async deleteUnusedFiles(){
        const hoursBeforeExpiried = 1;
        const expiredBefore = this.expiriedIn(hoursBeforeExpiried);
        const filesToDelete = await this.fileInfoRepository.findAll({where : {
            [Op.or] : [
                {createdAt : {[Op.lt] : expiredBefore}},
                {[Op.or] : [
                    {essenceTable : null},
                    {essenceId : null},
                ]}
            ]             
        }});
        
        filesToDelete.forEach(element => {
            const filePath = path.resolve(__dirname, '..', 'static');
            const fileName = element.fileName;            
            fs.rmSync(path.join(filePath, fileName));
        });

        await this.fileInfoRepository.destroy({where : {
            [Op.or] : [
                {createdAt : {[Op.lt] : expiredBefore}},
                {[Op.or] : [
                    {essenceTable : null},
                    {essenceId : null},
                ]}
            ]             
        }});   

        const deleted = filesToDelete.length;
        return deleted == 1 ? {message : `${deleted} file was deleted`} : {message : `${deleted} files were deleted`};        
    }

    async createFile(file : any) : Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            if (!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive : true});
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
            
        } catch (e) {
            console.log(e);
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private expiriedIn(hours : number) {
        const date = new Date();
        return date.setTime(date.getTime() - hours * 60 * 60 * 1000 + date.getTimezoneOffset() / 60);
    }

}
