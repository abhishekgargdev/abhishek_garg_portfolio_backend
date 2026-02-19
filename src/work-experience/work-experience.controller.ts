import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkExperienceService } from './work-experience.service';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUtil } from '../common/utils/response.util';
import { ResponseMessages } from '../common/constants/messages.constant';
import { StatusCodes } from '../common/constants/status-codes.constant';

@ApiTags('WorkExperience')
@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly service: WorkExperienceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create work experience (auth required)' })
  async create(@Request() req, @Body() dto: CreateWorkExperienceDto) {
    const payload = { ...dto };
    if (!payload.userId) payload.userId = req?.user?.userId;
    const result = await this.service.create(payload as any);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'List all work experiences' })
  async findAll() {
    const result = await this.service.findAll();
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user work experiences (auth required)' })
  async findByUser(@Request() req) {
    const result = await this.service.findByUser(req?.user?.userId);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work experience by id' })
  async findOne(@Param('id') id: string) {
    const result = await this.service.findOne(id);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update work experience (auth required)' })
  async update(@Param('id') id: string, @Body() dto: UpdateWorkExperienceDto) {
    const result = await this.service.update(id, dto);
    return ResponseUtil.success(result, ResponseMessages.USER_UPDATED, StatusCodes.OK);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete work experience (auth required)' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ResponseUtil.success(null, ResponseMessages.SUCCESS, StatusCodes.OK);
  }
}

