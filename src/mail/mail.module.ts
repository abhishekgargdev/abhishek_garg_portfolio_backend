import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [ConfigModule],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}