import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterLogModule } from './water-log/water-log.module';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [WaterLogModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
