import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResponseUtil } from '../common/utils/response.util';
import { StatusCodes } from '../common/constants/status-codes.constant';
import { ResponseMessages } from '../common/constants/messages.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
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
}
