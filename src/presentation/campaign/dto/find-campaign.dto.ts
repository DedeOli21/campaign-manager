import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindCampaignDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
