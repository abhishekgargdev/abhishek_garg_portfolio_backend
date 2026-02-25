import { Module } from '@nestjs/common';
import { DatabaseCheckService } from './database-check.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DatabaseCheckService],
  exports: [DatabaseCheckService],
})
export class DatabaseCheckModule {}
