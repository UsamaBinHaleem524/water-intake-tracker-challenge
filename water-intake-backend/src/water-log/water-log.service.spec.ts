import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogService } from './water-log.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WaterLogService', () => {
  let service: WaterLogService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterLogService, PrismaService],
    }).compile();

    service = module.get<WaterLogService>(WaterLogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should log water intake', async () => {
    const dto = { userId: 'user1', date: '2025-08-06', intakeMl: 1500 };
    jest.spyOn(prisma.waterLog, 'upsert').mockResolvedValue({
      id: 1,
      ...dto,
    });

    const result = await service.logWaterIntake(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(prisma.waterLog.upsert).toHaveBeenCalledWith({
      where: { userId_date: { userId: dto.userId, date: dto.date } },
      update: { intakeMl: dto.intakeMl },
      create: { userId: dto.userId, date: dto.date, intakeMl: dto.intakeMl },
    });
  });
});