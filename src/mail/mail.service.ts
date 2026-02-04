import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import ResetPasswordEmail from './templates/reset-password.template';
import { render } from '@react-email/render';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
      from: {
        name: 'Abhishek Garg',
        address: 'Full Stack developer in MERN Stack',
      },
    });
  }

  async sendPasswordResetEmail(
    email: string,
    userName: string,
    resetToken: string,
  ) {
    const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

    const emailHtml: any = render(
      ResetPasswordEmail({
        userName,
        resetLink,
      }),
    );

    await this.transporter.sendMail({
      from: this.configService.get('EMAIL_FROM'),
      to: email,
      subject: 'Password Reset Request',
      html: emailHtml,
    });
  }
}
