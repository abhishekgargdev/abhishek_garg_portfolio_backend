import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWorkExperienceDto) {
    const payload: any = { ...data };
    if (data.startDate) payload.startDate = new Date(data.startDate);
    if (data.endDate) payload.endDate = new Date(data.endDate);
    return this.prisma.workExperience.create({ data: payload });
  }

  async findAll() {
    return this.prisma.workExperience.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findByUser(userId: string) {
    return this.prisma.workExperience.findMany({ where: { userId }, orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.workExperience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Work experience not found');
    return item;
  }

  async update(id: string, data: UpdateWorkExperienceDto) {
    const payload: any = { ...data };
    if (data.startDate) payload.startDate = new Date(data.startDate as string);
    if (data.endDate) payload.endDate = new Date(data.endDate as string);
    await this.findOne(id);
    return this.prisma.workExperience.update({ where: { id }, data: payload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.workExperience.delete({ where: { id } });
  }
}

