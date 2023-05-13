import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fs } from 'fs';
import pdfParse from 'pdf-parse';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const validKeys = [
  'workexperience_document',
  'teaching_experience_document',
  'KPi',
];

const validateFile = async (buffer: Buffer): Promise<void> => {
  try {
    await pdfParse(buffer);
  } catch (error) {
    throw new BadRequestException(
      'Invalid file format. Only PDF files are allowed.',
    );
  }
};

export const fileUploadOptions: MulterOptions = {
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: async (req, file, cb) => {
    if (!validKeys.includes(file.fieldname)) {
      return cb(new BadRequestException('Invalid field key.'), false);
    }

    try {
      cb(null, true);
    } catch (error) {
      cb(error, false);
    }
  },
};
