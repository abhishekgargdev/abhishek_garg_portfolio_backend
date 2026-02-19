import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTimelineDto) {
    // parse dates
    const payload: any = { ...data };
    if (data.startDate) payload.startDate = new Date(data.startDate);
    if (data.endDate) payload.endDate = new Date(data.endDate);

    return this.prisma.timeline.create({ data: payload });
  }

  async findAll() {
    return this.prisma.timeline.findMany({ orderBy: { startDate: 'desc' } });
  }

  async findByUser(userId: string) {
    return this.prisma.timeline.findMany({ where: { userId }, orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.timeline.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Timeline item not found');
    return item;
  }

  async update(id: string, data: UpdateTimelineDto) {
    if (data.startDate) (data as any).startDate = new Date(data.startDate as string);
    if (data.endDate) (data as any).endDate = new Date(data.endDate as string);
    await this.findOne(id);
    return this.prisma.timeline.update({ where: { id }, data: data as any });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.timeline.delete({ where: { id } });
  }
}
