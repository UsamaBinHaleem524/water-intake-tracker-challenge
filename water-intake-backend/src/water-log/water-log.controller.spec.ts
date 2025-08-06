import { Test, TestingModule } from '@nestjs/testing';
import { WaterLogController } from './water-log.controller';
import { WaterLogService } from './water-log.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWaterLogDto, WaterSummaryDto } from './dto/water-log.dto';

describe('WaterLogController', () => {
  let controller: WaterLogController;
  let service: WaterLogService;

  const mockWaterLogService = {
    logWaterIntake: jest.fn(),
    getWaterSummary: jest.fn(),
  };
  
  const mockPrismaService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterLogController],
      providers: [
        { provide: WaterLogService, useValue: mockWaterLogService },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<WaterLogController>(WaterLogController);
    service = module.get<WaterLogService>(WaterLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call logWaterIntake with correct DTO', async () => {
      const dto: CreateWaterLogDto = {
        userId: 'user1',
        date: '2025-08-06',
        intakeMl: 1500,
      };
      const result = { id: 1, ...dto };
      mockWaterLogService.logWaterIntake.mockResolvedValue(result);

      const response = await controller.create(dto);
      expect(response).toEqual(result);
      expect(mockWaterLogService.logWaterIntake).toHaveBeenCalledWith(dto);
    });
  });

  describe('getSummary', () => {
    it('should call getWaterSummary with correct userId', async () => {
      const userId = 'user1';
      const summary: WaterSummaryDto[] = [
        { date: '2025-08-06', totalIntake: 1500, percentageOfGoal: 75 },
      ];
      mockWaterLogService.getWaterSummary.mockResolvedValue(summary);

      const response = await controller.getSummary(userId);
      expect(response).toEqual(summary);
      expect(mockWaterLogService.getWaterSummary).toHaveBeenCalledWith(userId);
    });
  });
});