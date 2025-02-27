import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(deleteCampaignDto: DeleteCampaignDto): Promise<any> {
    try {
      return await this.campaingRepository.deleteCampaign(deleteCampaignDto);
    } catch (error) {
      throw new error();
    }
  }
}
