import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindCampaignDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
