import * as React from 'react';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import {
  ResetPasswordEmail,
  WelcomeEmail,
  PasswordResetConfirmationEmail,
  UserQueryNotificationEmail,
  UserQueryConfirmationEmail,
} from './templates';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = Number(this.configService.get<number | string>('SMTP_PORT') || 587);
    const secureRaw = this.configService.get<string | boolean>('SMTP_SECURE');
    const secure =
      typeof secureRaw === 'boolean' ? secureRaw : String(secureRaw).toLowerCase() === 'true';
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASSWORD');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  private getFromAddress(): string {
    return this.configService.get(
      'EMAIL_FROM',
      'Abhishek Garg <noreply@abhishekgarg.dev>',
    );
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    try {
      const loginUrl = `${this.configService.get('FRONTEND_URL')}/login`;

      const emailHtml = await render(
        <WelcomeEmail userName={userName} loginUrl={loginUrl} />,
      );
      

      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: email,
        subject: 'Welcome to Abhishek Garg Portfolio Platform',
        html: emailHtml,
      });

      this.logger.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${email}`, error);
      throw error;
    }
  }

  async sendPasswordResetEmail(
    email: string,
    userName: string,
    resetToken: string,
  ): Promise<void> {
    try {
      const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`;

      const emailHtml = await  render(
        <ResetPasswordEmail userName={userName} resetLink={resetLink} />,
      );
      

      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: email,
        subject: 'Password Reset Request',
        html: emailHtml,
      });

      this.logger.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}`, error);
      throw error;
    }
  }

  async sendPasswordResetConfirmationEmail(
    email: string,
    userName: string,
  ): Promise<void> {
    try {
      const loginUrl = `${this.configService.get('FRONTEND_URL')}/login`;

      const emailHtml = await  render(
        <PasswordResetConfirmationEmail
          userName={userName}
          loginUrl={loginUrl}
        />,
      );
      

      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: email,
        subject: 'Password Reset Successful',
        html: emailHtml,
      });

      this.logger.log(
        `Password reset confirmation email sent successfully to ${email}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send password reset confirmation email to ${email}`,
        error,
      );
      throw error;
    }
  }

async sendGenericEmail(
    email: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: email,
        subject,
        html: htmlContent,
      });

      this.logger.log(`Generic email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send generic email to ${email}`, error);
      throw error;
    }
  }

  async sendUserQueryNotificationEmail(
    adminEmail: string,
    userName: string,
    userEmail: string,
    subject: string,
    message: string,
    queryId: string,
  ): Promise<void> {
    try {
      const emailHtml = await render(
        <UserQueryNotificationEmail
          userName={userName}
          userEmail={userEmail}
          subject={subject}
          message={message}
          queryId={queryId}
        />,
      );

      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: adminEmail,
        subject: `New Query: ${subject}`,
        html: emailHtml,
      });

      this.logger.log(`User query notification email sent successfully to ${adminEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send user query notification email to ${adminEmail}`, error);
      throw error;
    }
  }

  async sendUserQueryConfirmationEmail(
    email: string,
    userName: string,
    subject: string,
    message: string,
  ): Promise<void> {
    try {
      const emailHtml = await render(
        <UserQueryConfirmationEmail
          userName={userName}
          subject={subject}
          message={message}
        />,
      );

      await this.transporter.sendMail({
        from: this.getFromAddress(),
        to: email,
        subject: 'We Received Your Query',
        html: emailHtml,
      });

      this.logger.log(`User query confirmation email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send user query confirmation email to ${email}`, error);
      throw error;
    }
  }
}
