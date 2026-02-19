import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUtil } from '../common/utils/response.util';
import { ResponseMessages } from '../common/constants/messages.constant';
import { StatusCodes } from '../common/constants/status-codes.constant';

@ApiTags('Timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private readonly service: TimelineService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create timeline entry (auth required)' })
  async create(@Request() req, @Body() dto: CreateTimelineDto) {
    const payload = { ...dto };
    if (!payload.userId) payload.userId = req?.user?.userId;
    const result = await this.service.create(payload as any);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'List all timeline entries' })
  async findAll() {
    const result = await this.service.findAll();
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get current user timeline (auth required)' })
  async findByUser(@Request() req) {
    const result = await this.service.findByUser(req?.user?.userId);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get timeline entry by id' })
  async findOne(@Param('id') id: string) {
    const result = await this.service.findOne(id);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update timeline entry (auth required)' })
  async update(@Param('id') id: string, @Body() dto: UpdateTimelineDto) {
    const result = await this.service.update(id, dto);
    return ResponseUtil.success(result, ResponseMessages.USER_UPDATED, StatusCodes.OK);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete timeline entry (auth required)' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ResponseUtil.success(null, ResponseMessages.SUCCESS, StatusCodes.OK);
  }
}
