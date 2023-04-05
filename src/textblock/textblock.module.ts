import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { TextblockController } from './textblock.controller';
import { Textblock } from './textblock.model';
import { TextblockService } from './textblock.service';

@Module({
  controllers: [TextblockController],
  providers: [TextblockService],
  imports: [
    SequelizeModule.forFeature([Textblock]),
    forwardRef(() => AuthModule),
    FilesModule
  ]
})
export class TextblockModule {}
