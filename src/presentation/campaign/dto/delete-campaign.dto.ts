import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CampaignStatus } from '../../../domain/campaign/campaign.entity';

export class DeleteCampaignDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

}
