import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { Campaign } from '@domain/campaign/campaign.entity';

@Injectable()
export class FindCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: FindCampaignDto): Promise<Campaign> {
    try {
      return await this.campaingRepository.findCampaign(createCampaignDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
