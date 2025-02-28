import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(updateCampaignDto: UpdateCampaignDto): Promise<any> {
    try {

      const campaign = await this.campaingRepository.findCampaign({ id: updateCampaignDto.id });

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

      Object.assign(campaign, updateCampaignDto);

      return await this.campaingRepository.updateCampaign(campaign);
    } catch (error) {
      throw new Error(error);
    }
  }
}
