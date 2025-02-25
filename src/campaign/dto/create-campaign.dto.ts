import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CampaignStatus } from '../entities/campaign.entity';

export class CreateCampaignDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
