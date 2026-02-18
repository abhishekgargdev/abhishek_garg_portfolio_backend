import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzcyZGZhYzBhMDZjNDAwMDAwMDAwMDEiLCJpYXQiOjE3MDU5MTI5MzgsImV4cCI6MTcwNjUxNzczOH0.abc123def456',
    description: 'Refresh token received in login/register response',
    type: String,
  })
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString()
  refreshToken: string;
}
