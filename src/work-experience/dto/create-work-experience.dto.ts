import { IsString, IsOptional, IsArray, IsISO8601 } from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  companyName: string;

  @IsString()
  title: string;

  @IsISO8601()
  startDate: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  points?: string[];

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

