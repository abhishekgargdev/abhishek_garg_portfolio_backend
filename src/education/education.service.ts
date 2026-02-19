import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEducationDto) {
    const payload: any = { ...data };
    if (data.startDate) payload.startDate = new Date(data.startDate);
    if (data.endDate) payload.endDate = new Date(data.endDate);
    return this.prisma.education.create({ data: payload });
  }

  async findAll() {
    return this.prisma.education.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findByUser(userId: string) {
    return this.prisma.education.findMany({ where: { userId }, orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.education.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Education not found');
    return item;
  }

  async update(id: string, data: UpdateEducationDto) {
    const payload: any = { ...data };
    if (data.startDate) payload.startDate = new Date(data.startDate as string);
    if (data.endDate) payload.endDate = new Date(data.endDate as string);
    await this.findOne(id);
    return this.prisma.education.update({ where: { id }, data: payload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.education.delete({ where: { id } });
  }
}

