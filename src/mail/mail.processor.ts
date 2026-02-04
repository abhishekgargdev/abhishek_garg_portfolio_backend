import { Process, Processor, OnQueueFailed, OnQueueCompleted } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import type { Job } from 'bull';
import { MailService } from './mail.service';
import {
  QUEUE_NAMES,
  MAIL_JOBS,
  type WelcomeEmailJob,
  type PasswordResetEmailJob,
  type PasswordResetConfirmationJob,
  type GenericEmailJob,
} from '../queue';

@Processor(QUEUE_NAMES.MAIL)
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private mailService: MailService) {}

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(
      `Job ${job.id} of type ${job.name} completed successfully`,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(
      `Job ${job.id} of type ${job.name} failed with error: ${error.message}`,
      error.stack,
    );
  }

  @Process(MAIL_JOBS.SEND_WELCOME_EMAIL)
  async handleWelcomeEmail(job: Job<WelcomeEmailJob>) {
    this.logger.log(`Processing welcome email job for ${job.data.email}`);
    const { email, userName } = job.data;
    await this.mailService.sendWelcomeEmail(email, userName);
  }

  @Process(MAIL_JOBS.SEND_PASSWORD_RESET)
  async handlePasswordReset(job: Job<PasswordResetEmailJob>) {
    this.logger.log(`Processing password reset email job for ${job.data.email}`);
    const { email, userName, resetToken } = job.data;
    await this.mailService.sendPasswordResetEmail(email, userName, resetToken);
  }

  @Process(MAIL_JOBS.SEND_PASSWORD_RESET_CONFIRMATION)
  async handlePasswordResetConfirmation(
    job: Job<PasswordResetConfirmationJob>,
  ) {
    this.logger.log(
      `Processing password reset confirmation email job for ${job.data.email}`,
    );
    const { email, userName } = job.data;
    await this.mailService.sendPasswordResetConfirmationEmail(email, userName);
  }

  @Process(MAIL_JOBS.SEND_GENERIC_EMAIL)
  async handleGenericEmail(job: Job<GenericEmailJob>) {
    this.logger.log(`Processing generic email job for ${job.data.email}`);
    const { email, subject, htmlContent } = job.data;
    await this.mailService.sendGenericEmail(email, subject, htmlContent);
  }
}
