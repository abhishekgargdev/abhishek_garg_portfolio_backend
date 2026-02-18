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
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiHeader } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { ResponseUtil } from '../common/utils/response.util';
import { StatusCodes } from '../common/constants/status-codes.constant';

@ApiTags('Upload')
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
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload (image, document, etc.)',
        },
      },
      required: ['file'],
    },
    examples: {
      'image-upload': {
        summary: 'Upload image file',
        value: {
          file: 'profile.jpg',
        },
      },
    },
  })
  @ApiHeader({
    name: 'Content-Type',
    description: 'Must be multipart/form-data',
    required: true,
    example: 'multipart/form-data; boundary=...',
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully', schema: { example: { success: true, data: { url: 'https://res.cloudinary.com/...', publicId: 'portfolio/abc123', format: 'jpg', bytes: 1024 }, message: 'File uploaded successfully' } } })
  @ApiResponse({ status: 400, description: 'Bad request - no file provided' })
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
  @ApiOperation({ summary: 'Upload a file with compression' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload and compress',
        },
        quality: {
          type: 'string',
          description: 'Compression quality: "auto" or 1-100 (default: auto)',
          example: 'auto',
        },
        maxWidth: {
          type: 'string',
          description: 'Maximum width in pixels (default: 1920)',
          example: '1024',
        },
        format: {
          type: 'string',
          enum: ['webp', 'jpg', 'png'],
          description: 'Output format (default: webp)',
          example: 'webp',
        },
      },
      required: ['file'],
    },
    examples: {
      'compress-image': {
        summary: 'Upload and compress image',
        value: {
          file: 'large-image.jpg',
          quality: '80',
          maxWidth: '1024',
          format: 'webp',
        },
      },
    },
  })
  @ApiHeader({
    name: 'Content-Type',
    description: 'Must be multipart/form-data',
    required: true,
    example: 'multipart/form-data; boundary=...',
  })
  @ApiResponse({ status: 200, description: 'File uploaded and compressed successfully', schema: { example: { success: true, data: { original: { url: 'https://res.cloudinary.com/...', publicId: 'portfolio/abc123' }, compressed: { url: 'https://res.cloudinary.com/...', publicId: 'portfolio/abc123-compressed' } }, message: 'File uploaded and compressed successfully' } } })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
  @ApiOperation({ summary: 'Delete a file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Cloudinary public ID of the file to delete',
          example: 'portfolio/abc123def456',
        },
      },
      required: ['publicId'],
    },
    examples: {
      'delete-file': {
        summary: 'Delete file by public ID',
        value: {
          publicId: 'portfolio/abc123def456',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - public ID required' })
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
