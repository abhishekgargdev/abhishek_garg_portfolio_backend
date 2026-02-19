import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUtil } from '../common/utils/response.util';
import { ResponseMessages } from '../common/constants/messages.constant';
import { StatusCodes } from '../common/constants/status-codes.constant';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create certificate (auth required)' })
  async create(@Request() req, @Body() dto: CreateCertificateDto) {
    const payload = { ...dto };
    if (!payload.userId) payload.userId = req?.user?.userId;
    const result = await this.service.create(payload as any);
    return ResponseUtil.success(
      result,
      ResponseMessages.SUCCESS,
      StatusCodes.CREATED,
    );
  }

  @Get()
  @ApiOperation({ summary: 'List all certificates' })
  async findAll() {
    const result = await this.service.findAll();
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user certificates (auth required)' })
  async findByUser(@Request() req) {
    const result = await this.service.findByUser(req?.user?.userId);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate by id' })
  async findOne(@Param('id') id: string) {
    const result = await this.service.findOne(id);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update certificate (auth required)' })
  async update(@Param('id') id: string, @Body() dto: UpdateCertificateDto) {
    const result = await this.service.update(id, dto);
    return ResponseUtil.success(
      result,
      ResponseMessages.USER_UPDATED,
      StatusCodes.OK,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete certificate (auth required)' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ResponseUtil.success(null, ResponseMessages.SUCCESS, StatusCodes.OK);
  }
}

