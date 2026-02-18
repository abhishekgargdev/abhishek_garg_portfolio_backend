import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'abc123def456xyz789',
    description: 'Reset token received in password reset email',
    type: String,
  })
  @IsNotEmpty({ message: 'Reset token is required' })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'NewSecurePass@456',
    description: 'New password (8-32 chars, must contain uppercase, lowercase, digit, special char)',
    minLength: 8,
    maxLength: 32,
    type: String,
  })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  newPassword: string;
}
