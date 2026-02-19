import { IsString, IsOptional, IsISO8601 } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  title: string;

  @IsISO8601()
  date: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  imagePublicId?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

