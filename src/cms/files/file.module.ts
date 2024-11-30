import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './entities/file.schema';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
