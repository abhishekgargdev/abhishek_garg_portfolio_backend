import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../upload/cloudinary.service';
import { ApiConsumes } from '@nestjs/swagger';
import { ResponseUtil } from '../common/utils/response.util';
import { StatusCodes } from '../common/constants/status-codes.constant';
import { ResponseMessages } from '../common/constants/messages.constant';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'Valid login request',
        value: {
          email: 'user@example.com',
          password: 'SecurePass@123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful, returns access and refresh tokens' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return ResponseUtil.success(
        result,
        ResponseMessages.LOGIN_SUCCESS,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({
    type: ForgotPasswordDto,
    description: 'Email address to send password reset link',
    examples: {
      example1: {
        summary: 'Valid forgot password request',
        value: {
          email: 'user@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Password reset email sent if user exists' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      await this.authService.forgotPassword(forgotPasswordDto);
      return ResponseUtil.success(
        null,
        ResponseMessages.PASSWORD_RESET_EMAIL_SENT,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Reset token and new password',
    examples: {
      example1: {
        summary: 'Valid reset password request',
        value: {
          token: 'abc123def456xyz789',
          newPassword: 'NewSecurePass@456',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const result = await this.authService.resetPassword(resetPasswordDto);
      return ResponseUtil.success(
        null,
        ResponseMessages.PASSWORD_RESET_SUCCESS,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Refresh token to get new access token',
    examples: {
      example1: {
        summary: 'Valid refresh token request',
        value: {
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzcyZGZhYzBhMDZjNDAwMDAwMDAwMDEiLCJpYXQiOjE3MDU5MTI5MzgsImV4cCI6MTcwNjUxNzczOH0.abc123def456',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'New access and refresh tokens returned' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result = await this.authService.refreshToken(refreshTokenDto);
      return ResponseUtil.success(
        result,
        ResponseMessages.TOKEN_REFRESH_SUCCESS,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user details' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token (access token)',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({ status: 200, description: 'User details retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserDetails(@Request() req) {
    try {
      const result = await this.authService.getUserDetails(req?.user?.userId);
      return ResponseUtil.success(
        result,
        ResponseMessages.USER_FOUND,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateUserDetails(@Request() req, @Body() dto: UpdateUserDto) {
    try {
      const result = await this.authService.updateUserDetails(req?.user?.userId, dto);
      return ResponseUtil.success(
        result,
        ResponseMessages.USER_UPDATED,
        StatusCodes.OK,
      );
    } catch (error: any) {
      return ResponseUtil.error(
        error.message,
        error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload or update profile avatar' })
  async uploadAvatar(@Request() req, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const upload = await this.cloudinaryService.uploadWithCompression(
      file,
      { quality: 'auto', maxWidth: 1024, format: 'webp' },
      'portfolio/profile',
    );

    const imageUrl = upload.compressedUrl || upload.secureUrl || upload.url;

    const updated = await this.authService.updateUserDetails(req?.user?.userId, {
      profileImageUrl: imageUrl,
      profileImagePublicId: upload.publicId,
    });

    return ResponseUtil.success(
      updated,
      ResponseMessages.USER_UPDATED,
      StatusCodes.OK,
    );
  }
}
