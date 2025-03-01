import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class CreateCampaignUseCase {
  constructor(
    private readonly campaignRepository: CampaignRepository,

    @InjectPinoLogger(CreateCampaignUseCase.name)
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(CreateCampaignUseCase.name);
  }

  async call(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      this.logger.info('CreateCampaignUseCase START', new Date());

      const statusValid = validateCampaignDates(
        createCampaignDto.startDate,
        createCampaignDto.endDate,
      );

      this.logger.info('CreateCampaignUseCase statusValid', statusValid);

      return await this.campaignRepository.createCampaign({
        ...createCampaignDto,
        status: statusValid,
      });
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
