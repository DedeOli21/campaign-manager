import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCampaignDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
