import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class FindCampaignUseCase {
  constructor(
    private readonly campaignRepository: CampaignRepository,

    @InjectPinoLogger(FindCampaignUseCase.name)
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(FindCampaignUseCase.name);
  }

  async call(createCampaignDto: FindCampaignDto): Promise<Campaign> {
    try {
      this.logger.info('FindCampaignUseCase START');

      const campaign =
        await this.campaignRepository.findCampaign(createCampaignDto);

      this.logger.info('FindCampaignUseCase campaign', campaign);

      return campaign;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
