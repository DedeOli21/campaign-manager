import { Injectable } from '@nestjs/common';
import { CampaignRepository } from 'src/domain/repositories/campaign.repository';

@Injectable()
export class FindAllCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(): Promise<any> {
    return await this.campaingRepository.listCampaigns();
  }
}
