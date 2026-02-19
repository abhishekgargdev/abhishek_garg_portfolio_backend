import { IsOptional, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsString()
  profileImagePublicId?: string;

  @IsOptional()
  @IsString()
  beyondCode?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  beyondCodeTags?: string[];
}
