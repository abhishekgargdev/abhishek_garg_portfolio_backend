import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import {
  MAIL_JOBS,
  DEFAULT_JOB_OPTIONS,
} from '../queue';

@Injectable()
export class UserQueriesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  async create(data: CreateUserQueryDto) {
    const userQuery = await this.prisma.userQuery.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    // Send notification email to admin
    const adminEmail = this.configService.get<string>('SEED_USER_EMAIL') || 'abhishek@example.com';
    await this.mailQueue.add(
      MAIL_JOBS.SEND_USER_QUERY_NOTIFICATION,
      {
        adminEmail,
        userName: data.name,
        userEmail: data.email,
        subject: data.subject,
        message: data.message,
        queryId: userQuery.id,
      },
      DEFAULT_JOB_OPTIONS,
    );

    // Send confirmation email to user
    await this.mailQueue.add(
      MAIL_JOBS.SEND_USER_QUERY_CONFIRMATION,
      {
        email: data.email,
        userName: data.name,
        subject: data.subject,
        message: data.message,
      },
      DEFAULT_JOB_OPTIONS,
    );

    return userQuery;
  }

  async findAll() {
    return this.prisma.userQuery.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.userQuery.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('User query not found');
    return item;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.userQuery.delete({ where: { id } });
  }
}

