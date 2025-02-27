import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';

@Injectable()
export class CreateCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    try {
      const statusValid = validateCampaignDates(
        createCampaignDto.startDate,
        createCampaignDto.endDate,
      );

      return await this.campaingRepository.createCampaign({
        ...createCampaignDto,
        status: statusValid,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
