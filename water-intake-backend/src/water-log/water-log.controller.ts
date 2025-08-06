import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { CreateWaterLogDto, WaterSummaryDto } from './dto/water-log.dto';

@Controller('water-log')
export class WaterLogController {
  constructor(private readonly waterLogService: WaterLogService) {}

  @Post()
  async create(@Body() createWaterLogDto: CreateWaterLogDto) {
    return this.waterLogService.logWaterIntake(createWaterLogDto);
  }

  @Get('summary/:userId')
  async getSummary(@Param('userId') userId: string): Promise<WaterSummaryDto[]> {
    return this.waterLogService.getWaterSummary(userId);
  }
}