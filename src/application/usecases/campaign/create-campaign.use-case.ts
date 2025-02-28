import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';
import { InjectPinoLogger, Logger } from 'nestjs-pino';

@Injectable()
export class CreateCampaignUseCase {
  constructor(
    private readonly campaingRepository: CampaignRepository,

    @InjectPinoLogger(CreateCampaignUseCase.name)
    private readonly logger: Logger,
  ) {}

  async call(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      this.logger.log('CreateCampaignUseCase START');

      const statusValid = validateCampaignDates(
        createCampaignDto.startDate,
        createCampaignDto.endDate,
      );

      this.logger.log('CreateCampaignUseCase statusValid', statusValid);

      return await this.campaingRepository.createCampaign({
        ...createCampaignDto,
        status: statusValid,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
