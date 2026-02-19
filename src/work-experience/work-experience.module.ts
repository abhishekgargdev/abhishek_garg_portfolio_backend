import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
  exports: [WorkExperienceService],
})
export class WorkExperienceModule {}

