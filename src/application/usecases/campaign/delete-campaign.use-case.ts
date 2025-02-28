import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';
import { ResponseDeleteDto } from '@infra/dto/response-delete.dto';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(private readonly campaingRepository: CampaignRepository) {}

  async call(deleteCampaignDto: DeleteCampaignDto): Promise<ResponseDeleteDto> {
    try {
      return await this.campaingRepository.deleteCampaign(deleteCampaignDto);
    } catch (error) {
      throw new error();
    }
  }
}
