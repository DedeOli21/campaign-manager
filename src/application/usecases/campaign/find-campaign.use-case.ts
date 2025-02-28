import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { InjectPinoLogger, Logger } from 'nestjs-pino';

@Injectable()
export class FindCampaignUseCase {
  constructor(
    private readonly campaingRepository: CampaignRepository,

    @InjectPinoLogger(FindCampaignUseCase.name)
    private readonly logger: Logger,
  ) {}

  async call(createCampaignDto: FindCampaignDto): Promise<Campaign> {
    try {
      this.logger.log('FindCampaignUseCase START');

      const campaign =
        await this.campaingRepository.findCampaign(createCampaignDto);

      this.logger.log('FindCampaignUseCase campaign', campaign);

      return campaign;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
