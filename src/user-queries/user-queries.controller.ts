import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserQueriesService } from './user-queries.service';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseUtil } from '../common/utils/response.util';
import { ResponseMessages } from '../common/constants/messages.constant';
import { StatusCodes } from '../common/constants/status-codes.constant';

@ApiTags('User Queries')
@Controller('user-queries')
export class UserQueriesController {
  constructor(private readonly service: UserQueriesService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a new user query (public)' })
  async create(@Body() dto: CreateUserQueryDto) {
    const result = await this.service.create(dto);
    return ResponseUtil.success(
      result,
      ResponseMessages.SUCCESS,
      StatusCodes.CREATED,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'List all user queries (auth required)' })
  async findAll() {
    const result = await this.service.findAll();
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user query by id (auth required)' })
  async findOne(@Param('id') id: string) {
    const result = await this.service.findOne(id);
    return ResponseUtil.success(result, ResponseMessages.SUCCESS, StatusCodes.OK);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete user query (auth required)' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return ResponseUtil.success(null, ResponseMessages.SUCCESS, StatusCodes.OK);
  }
}

