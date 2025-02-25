import { Injectable } from "@nestjs/common";
import { CampaignRepository } from "src/domain/repositories/campaign.repository";
import { FindCampaignDto } from "src/presentation/campaign/dto/find-campaign.dto";

@Injectable()
export class FindCampaignUseCase {
    constructor(
        private readonly campaingRepository: CampaignRepository
    ) {}

    async call(createCampaignDto: FindCampaignDto): Promise<any> {
        return await this.campaingRepository.findCampaign(createCampaignDto.id);
    }
}