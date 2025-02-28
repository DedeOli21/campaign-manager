import { Injectable, Logger } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Campaign } from '@domain/entities/campaign.entity';
import { InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class ListCampaignUseCase {
  constructor(
    private readonly campaingRepository: CampaignRepository,

    @InjectPinoLogger(ListCampaignUseCase.name)
    private readonly logger: Logger,
  ) {}

  async call(): Promise<Campaign[]> {
    try {
      this.logger.log('ListCampaignUseCase START');

      const campaigns = await this.campaingRepository.listCampaigns();

      this.logger.log('ListCampaignUseCase campaigns', campaigns);
      return campaigns;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
