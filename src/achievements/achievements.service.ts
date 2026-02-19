import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAchievementDto) {
    const payload: any = { ...data };
    if (data.date) payload.date = new Date(data.date);
    return this.prisma.achievement.create({ data: payload });
  }

  async findAll() {
    return this.prisma.achievement.findMany({ orderBy: { date: 'desc' } });
  }

  async findByUser(userId: string) {
    return this.prisma.achievement.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.achievement.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Achievement not found');
    return item;
  }

  async update(id: string, data: UpdateAchievementDto) {
    const payload: any = { ...data };
    if (data.date) payload.date = new Date(data.date as string);
    await this.findOne(id);
    return this.prisma.achievement.update({ where: { id }, data: payload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.achievement.delete({ where: { id } });
  }
}

