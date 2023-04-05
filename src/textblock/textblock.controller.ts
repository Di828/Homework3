import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/role-auth.decorator';
import { RolesGuard } from '../auth/role.guard';
import { AddTextblockDto } from './dto/addtextblock.dto';
import { TextblockService } from './textblock.service';

@Controller('textblock')
export class TextblockController {    

    constructor(private textblockService : TextblockService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':searchName')
    getTextblockBySearchName(@Param('searchName') searchName : string) {     
        return this.textblockService.getTextblockBySearchName(searchName);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTextblocks() {     
        return this.textblockService.getAllTextblocks();
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    addTextblock(@Body() textblockDto : AddTextblockDto,
                 @UploadedFile() image){                    
        return this.textblockService.addTextblock(textblockDto, image);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':searchName')
    updateTextblock(@Param('searchName') searchName : string, @Body() textblockDto : AddTextblockDto){
        return this.textblockService.updateTextblock(searchName, textblockDto);
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':searchName')
    deleteTextblock(@Param('searchName') searchName : string){
        return this.textblockService.deleteTextblock(searchName);
    }
}
