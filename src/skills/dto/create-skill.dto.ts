import { IsString, IsOptional, IsEnum } from 'class-validator';
import { SkillSection } from 'src/generated/prisma/enums';

export class CreateSkillDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  iconName?: string;

  @IsEnum(SkillSection)
  section: SkillSection;

  @IsOptional()
  @IsString()
  iconLibrary?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
