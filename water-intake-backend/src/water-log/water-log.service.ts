import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterLogDto, WaterSummaryDto } from './dto/water-log.dto';

@Injectable()
export class WaterLogService {
  constructor(private prisma: PrismaService) {}

  async logWaterIntake(dto: CreateWaterLogDto) {
    return this.prisma.waterLog.upsert({
      where: { userId_date: { userId: dto.userId, date: dto.date } },
      update: { intakeMl: dto.intakeMl },
      create: {
        userId: dto.userId,
        date: dto.date,
        intakeMl: dto.intakeMl,
      },
    });
  }

  async getWaterSummary(userId: string): Promise<WaterSummaryDto[]> {
    const goal = 2000;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const startDate = sevenDaysAgo.toISOString().split('T')[0];
  
    const logs = await this.prisma.waterLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  
    const summaryMap: Record<string, WaterSummaryDto> = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const formatted = date.toISOString().split('T')[0];
      summaryMap[formatted] = {
        date: formatted,
        totalIntake: 0,
        percentageOfGoal: 0,
      };
    }
  
    for (const log of logs) {
      if (summaryMap[log.date]) {
        summaryMap[log.date].totalIntake = log.intakeMl;
        summaryMap[log.date].percentageOfGoal = Math.round((log.intakeMl / goal) * 100);
      }
    }
  
    return Object.values(summaryMap);
  }
  
}