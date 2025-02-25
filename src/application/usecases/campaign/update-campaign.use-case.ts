import { Injectable } from '@nestjs/common';
import { CampaignRepository } from 'src/domain/repositories/campaign.repository';
import { UpdateCampaignDto } from 'src/presentation/campaign/dto/update-campaign.dto';

@Injectable()
export class UpdateCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: UpdateCampaignDto): Promise<any> {
    return await this.campaingRepository.updateCampaign(
      createCampaignDto.id,
      createCampaignDto,
    );
  }
}
