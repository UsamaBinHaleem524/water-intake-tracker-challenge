export class CreateWaterLogDto {
    userId: string;
    date: string;
    intakeMl: number;
  }
  
  export class WaterSummaryDto {
    date: string;
    totalIntake: number;
    percentageOfGoal: number;
  }