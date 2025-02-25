import { Injectable } from "@nestjs/common";
import { CampaignRepository } from "src/domain/repositories/campaign.repository";
import { DeleteCampaignDto } from "src/presentation/campaign/dto/delete-campaign.dto";

@Injectable()
export class DeleteCampaignUseCase {
    constructor(
        private readonly campaingRepository: CampaignRepository
    ) {}

    async call(createCampaignDto: DeleteCampaignDto): Promise<any> {
        return await this.campaingRepository.deleteCampaign(createCampaignDto.id);
    }
}