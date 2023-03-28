import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileInfo } from './fileinfo.model';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    SequelizeModule.forFeature([FileInfo])
  ]
})
export class FilesModule {}
