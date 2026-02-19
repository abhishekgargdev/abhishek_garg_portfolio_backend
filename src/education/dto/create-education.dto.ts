import { IsString, IsOptional, IsArray, IsISO8601 } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  degree: string;

  @IsString()
  collegeName: string;

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
  tags?: string[];

  @IsOptional()
  @IsString()
  userId?: string;
}

