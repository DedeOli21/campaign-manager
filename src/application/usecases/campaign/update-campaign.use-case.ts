import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';
import { Campaign } from '@domain/entities/campaign.entity';
import { InjectPinoLogger, Logger } from 'nestjs-pino';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(
    private readonly campaingRepository: CampaignRepository,

    @InjectPinoLogger(UpdateCampaignUseCase.name)
    private readonly logger: Logger,
  ) {}

  async call(updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
    try {
      this.logger.log('UpdateCampaignUseCase START');

      const campaign = await this.campaingRepository.findCampaign({
        id: updateCampaignDto.id,
      });

      this.logger.log('UpdateCampaignUseCase campaign', campaign);

      if (!campaign) {
        throw new Error('Campaign not found');
      }

      const startDate = updateCampaignDto.startDate ?? campaign.startDate;
      const endDate = updateCampaignDto.endDate ?? campaign.endDate;
      const status = updateCampaignDto.status ?? campaign.status;

      updateCampaignDto.status = validateCampaignDates(
        startDate,
        endDate,
        status,
      );

      this.logger.log(
        'UpdateCampaignUseCase updateCampaignDto',
        updateCampaignDto,
      );

      Object.assign(campaign, updateCampaignDto);

      return await this.campaingRepository.updateCampaign(campaign);
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
