import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import type { Queue } from 'bull';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { randomBytes } from 'crypto';
import {
  MAIL_JOBS,
  DEFAULT_JOB_OPTIONS,
} from '../queue';

@Injectable()
export class AuthService {
  private mailQueue: Queue;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.mailQueue = this.configService.get<Queue>('MAIL_QUEUE')!;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
      },
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      ...tokens,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: await bcrypt.hash(resetToken, 10),
        resetTokenExpiry,
      },
    });

    // Add email to queue with the new job name
    await this.mailQueue.add(
      MAIL_JOBS.SEND_PASSWORD_RESET,
      {
        email: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        resetToken,
      },
      DEFAULT_JOB_OPTIONS,
    );

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    const users = await this.prisma.user.findMany({
      where: {
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    let validUser: any = null;

    for (const user of users) {
      if (user.resetToken) {
        const isTokenValid = await bcrypt.compare(token, user.resetToken);
        if (isTokenValid) {
          validUser = user;
          break;
        }
      }
    }

    if (!validUser) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: validUser?.id },
      data: {
        hashPassword: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        accessToken: null,
        refreshToken: null,
      },
    });

    // Send password reset confirmation email
    await this.mailQueue.add(
      MAIL_JOBS.SEND_PASSWORD_RESET_CONFIRMATION,
      {
        email: validUser.email,
        userName: `${validUser.firstName} ${validUser.lastName}`,
      },
      DEFAULT_JOB_OPTIONS,
    );

    return { message: 'Password reset successful' };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user.id, user.email);

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: tokens.accessToken,
          refreshToken: await bcrypt.hash(tokens.refreshToken, 10),
        },
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async getUserDetails(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Method to send welcome email when user registers
  async sendWelcomeEmail(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.mailQueue.add(
      MAIL_JOBS.SEND_WELCOME_EMAIL,
      {
        email: user.email,
        userName: `${user.firstName} ${user.lastName}`,
      },
      DEFAULT_JOB_OPTIONS,
    );

    return { message: 'Welcome email queued successfully' };
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });

    return { accessToken, refreshToken };
  }
}
