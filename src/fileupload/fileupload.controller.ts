import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from './fileupload.utils';
@Controller('fileupload')
export class FileuploadController {
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'workexperience_document', maxCount: 1 },
        { name: 'teaching_experience_document', maxCount: 1 },
        { name: 'KPi', maxCount: 1 },
      ],
      fileUploadOptions,
    ),
  )
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // Handle the uploaded files, e.g., save their paths in the database
    return { message: 'Files uploaded successfully' };
  }
}
