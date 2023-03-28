import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddFileDto } from './dto/addfile.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {

    constructor (private fileService : FilesService){}

    //Эндпоинты для тестирования, реальный доступ к файл сервису будет осуществляться из других модулей, с соответствующими ограничениями.
    
    @Get(':table/:id')
    getFilesForEssenceById(@Param('table') essenceTable : string, @Param('id') essenceId : number){
        return this.fileService.getFilesForEssenceById(essenceTable, essenceId);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    addFile(@Body() addFileDto : AddFileDto,
            @UploadedFile() uploadedFile){
        return this.fileService.addFileInfo(addFileDto, uploadedFile);
    }

    @Delete()
    deleteUnusedFiles(){
        return this.fileService.deleteUnusedFiles();
    }
}
