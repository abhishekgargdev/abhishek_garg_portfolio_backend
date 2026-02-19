import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsEnum, IsISO8601 } from 'class-validator';
import { TimelineType } from 'src/generated/prisma/enums';

export class CreateTimelineDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subTitle?: string;

  @IsEnum(TimelineType)
  type: TimelineType;

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
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  userId?: string;
}
