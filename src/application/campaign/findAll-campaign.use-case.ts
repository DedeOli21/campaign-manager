import { Injectable } from "@nestjs/common";
import { CampaignRepository } from "src/domain/repositories/campaign.repository";
import { CreateCampaignDto } from "src/presentation/campaign/dto/create-campaign.dto";

@Injectable()
export class FindAllCampaignUseCase {
    constructor(
        private readonly campaingRepository: CampaignRepository
    ) {}

    async call(): Promise<any> {
        return await this.campaingRepository.listCampaigns();
    }
}