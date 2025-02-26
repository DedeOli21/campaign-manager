import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { Campaign } from '@domain/campaign/campaign.entity';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';

@Injectable()
export class CreateCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      const statusValid = validateCampaignDates(
        createCampaignDto.startDate,
        createCampaignDto.endDate,
      )

      console.log('statusValid', statusValid);
      console.log('createCampaignDto', createCampaignDto);

      return await this.campaingRepository.createCampaign({ status: statusValid, ...createCampaignDto });
    } catch (error) {
      throw new Error(error);
    }

  }
}
