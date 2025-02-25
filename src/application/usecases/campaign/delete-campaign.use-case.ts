import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(createCampaignDto: DeleteCampaignDto): Promise<any> {
    return await this.campaingRepository.deleteCampaign(createCampaignDto.id);
  }
}
