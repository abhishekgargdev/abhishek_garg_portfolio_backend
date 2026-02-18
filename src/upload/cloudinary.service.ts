import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export interface UploadResponse {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
}

export interface CompressedUploadResponse extends UploadResponse {
  compressedUrl: string;
  compressionRatio?: string;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private readonly configService: ConfigService) {
    this.initializeCloudinary();
  }

  private initializeCloudinary() {
    const cloudinaryUrl = this.configService.get<string>('CLOUDINARY_URL');

    if (!cloudinaryUrl) {
      this.logger.warn('CLOUDINARY_URL not configured');
      return;
    }

    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
    });

    this.logger.log('✅ Cloudinary initialized successfully');
  }

  // ===============================
  // BASIC FILE UPLOAD
  // ===============================
  async uploadFile(
    file: Express.Multer.File,
    folder = 'portfolio',
  ): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await this.uploadToCloudinary(file, folder);

      return {
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      };
    } catch (error: any) {
      this.logger.error('Upload failed', error?.message);
      throw new BadRequestException(
        `Upload failed: ${error?.message ?? 'Unknown error'}`,
      );
    }
  }

  // ===============================
  // UPLOAD WITH COMPRESSION
  // ===============================
  async uploadWithCompression(
    file: Express.Multer.File,
    options: {
      quality?: 'auto' | number;
      maxWidth?: number;
      format?: 'webp' | 'jpg' | 'png';
    } = { quality: 'auto', maxWidth: 1920, format: 'webp' },
    folder = 'portfolio',
  ): Promise<CompressedUploadResponse> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await this.uploadToCloudinary(file, folder);

      const compressedUrl = cloudinary.url(result.public_id, {
        fetch_format: 'auto',
        quality: options.quality ?? 'auto',
        width: options.maxWidth ?? 1920,
        crop: 'scale',
        format: options.format ?? 'webp',
      });

      return {
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        compressedUrl,
        compressionRatio: 'Auto optimized by Cloudinary',
      };
    } catch (error: any) {
      this.logger.error('Upload with compression failed', error?.message);
      throw new BadRequestException(
        `Upload failed: ${error?.message ?? 'Unknown error'}`,
      );
    }
  }

  // ===============================
  // DELETE FILE
  // ===============================
  async deleteFile(publicId: string): Promise<void> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required');
    }

    try {
      await cloudinary.uploader.destroy(publicId);
      this.logger.log(`File deleted: ${publicId}`);
    } catch (error: any) {
      this.logger.error('Deletion failed', error?.message);
      throw new BadRequestException(
        `Deletion failed: ${error?.message ?? 'Unknown error'}`,
      );
    }
  }

  // ===============================
  // OPTIMIZED URL GENERATOR
  // ===============================
  getOptimizedUrl(
    publicId: string,
    transformations?: {
      quality?: 'auto' | number;
      width?: number;
      height?: number;
      crop?: string;
      format?: string;
      gravity?: string;
    },
  ): string {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: transformations?.quality ?? 'auto',
      width: transformations?.width,
      height: transformations?.height,
      crop: transformations?.crop ?? 'scale',
      format: transformations?.format,
      gravity: transformations?.gravity,
    });
  }

  // ===============================
  // PRIVATE HELPER
  // ===============================
  private uploadToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
