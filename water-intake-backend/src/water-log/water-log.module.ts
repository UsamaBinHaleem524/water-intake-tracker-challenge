import { Module } from '@nestjs/common';
import { WaterLogService } from './water-log.service';
import { WaterLogController } from './water-log.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [WaterLogService, PrismaService],
  controllers: [WaterLogController]
})
export class WaterLogModule {}
