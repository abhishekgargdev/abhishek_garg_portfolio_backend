import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCertificateDto) {
    const payload: any = { ...data };
    if (data.date) payload.date = new Date(data.date);
    return this.prisma.certificate.create({ data: payload });
  }

  async findAll() {
    return this.prisma.certificate.findMany({ orderBy: { date: 'desc' } });
  }

  async findByUser(userId: string) {
    return this.prisma.certificate.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.certificate.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Certificate not found');
    return item;
  }

  async update(id: string, data: UpdateCertificateDto) {
    const payload: any = { ...data };
    if (data.date) payload.date = new Date(data.date as string);
    await this.findOne(id);
    return this.prisma.certificate.update({ where: { id }, data: payload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.certificate.delete({ where: { id } });
  }
}

