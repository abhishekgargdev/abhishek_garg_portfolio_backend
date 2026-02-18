import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Delete,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ResponseUtil } from '../common/utils/response.util';
import { StatusCodes } from '../common/constants/status-codes.constant';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Upload a single file
   * POST /upload/file
   */
  @Post('file')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const result = await this.cloudinaryService.uploadFile(
      file,
      'portfolio',
    );

    return ResponseUtil.success(
      result,
      'File uploaded successfully',
      StatusCodes.OK,
    );
  }

  /**
   * Upload a file with compression
   * POST /upload/compressed
   */
  @Post('compressed')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCompressed(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: {
      quality?: 'auto' | string;
      maxWidth?: string;
      format?: 'webp' | 'jpg' | 'png';
    },
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const quality =
      body.quality === 'auto'
        ? 'auto'
        : body.quality
        ? Number(body.quality)
        : 'auto';

    const maxWidth = body.maxWidth ? Number(body.maxWidth) : 1920;

    const format: 'webp' | 'jpg' | 'png' =
      body.format || 'webp';

    const result =
      await this.cloudinaryService.uploadWithCompression(
        file,
        { quality, maxWidth, format },
        'portfolio',
      );

    return ResponseUtil.success(
      result,
      'File uploaded and compressed successfully',
      StatusCodes.OK,
    );
  }

  /**
   * Delete a file
   * DELETE /upload/file
   */
  @Delete('file')
  @HttpCode(HttpStatus.OK)
  async deleteFile(@Body() body: { publicId: string }) {
    if (!body.publicId) {
      throw new BadRequestException('Public ID is required');
    }

    await this.cloudinaryService.deleteFile(body.publicId);

    return ResponseUtil.success(
      null,
      'File deleted successfully',
      StatusCodes.OK,
    );
  }
}
