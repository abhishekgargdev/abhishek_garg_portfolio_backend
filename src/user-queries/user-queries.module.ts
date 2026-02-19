import { Module } from '@nestjs/common';
import { UserQueriesService } from './user-queries.service';
import { UserQueriesController } from './user-queries.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [PrismaModule, QueueModule],
  providers: [UserQueriesService],
  controllers: [UserQueriesController],
  exports: [UserQueriesService],
})
export class UserQueriesModule {}

