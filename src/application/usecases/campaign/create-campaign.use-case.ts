import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';

@Injectable()
export class CreateCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: CreateCampaignDto): Promise<any> {
    return await this.campaingRepository.createCampaign(createCampaignDto);
  }
}
