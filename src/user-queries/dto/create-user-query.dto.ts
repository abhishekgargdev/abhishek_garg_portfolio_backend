import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserQueryDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'Project Inquiry', description: 'Subject of the query' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject: string;

  @ApiProperty({ example: 'I would like to inquire about...', description: 'Message content' })
  @IsNotEmpty()
  @IsString()
  message: string;
}

