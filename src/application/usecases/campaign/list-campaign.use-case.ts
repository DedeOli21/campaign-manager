import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Campaign } from '@domain/entities/campaign.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class ListCampaignUseCase {
  constructor(
    private readonly campaignRepository: CampaignRepository,

    @InjectPinoLogger(ListCampaignUseCase.name)
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ListCampaignUseCase.name);
  }

  async call(): Promise<Campaign[]> {
    try {
      this.logger.info('ListCampaignUseCase START');

      const campaigns = await this.campaignRepository.listCampaigns();

      this.logger.info('ListCampaignUseCase campaigns', campaigns);
      return campaigns;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
