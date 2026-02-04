import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { MailService } from './mail.service';

export interface PasswordResetEmailJob {
  email: string;
  userName: string;
  resetToken: string;
}

@Processor('mail')
export class MailProcessor {
  constructor(private mailService: MailService) {}

  @Process('send-password-reset')
  async handlePasswordReset(job: Job<PasswordResetEmailJob>) {
    const { email, userName, resetToken } = job.data;
    await this.mailService.sendPasswordResetEmail(email, userName, resetToken);
  }
}
