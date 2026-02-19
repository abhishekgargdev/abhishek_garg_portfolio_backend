import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsObject } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  domain: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsObject()
  blob?: {
    projectIntro?: string;
    githubLink?: string;
    documentLink?: string;
    liveLink?: string;
  };

  @IsOptional()
  @IsString()
  userId?: string;
}

