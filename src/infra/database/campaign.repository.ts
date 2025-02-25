import { InjectRepository } from "@nestjs/typeorm";
import { Campaign } from "src/domain/campaign/campaign.entity";
import { CampaignRepository } from "src/domain/repositories/campaign.repository";
import { validateCampaignDates } from "src/shared/helpers/verify-date.helper";
import { Repository } from "typeorm";

export class CampaignImpl implements CampaignRepository {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>
    ) {}

    async createCampaign(createCampaignDto: any): Promise<any> {
        try {
            const campaing = this.campaignRepository.create(createCampaignDto);

            if (!campaing) {
                throw new Error('Error creating campaign');
            }

            return await this.campaignRepository.save(campaing);
        } catch (error) {
            throw new Error(error);
        }
    }

    // implements delete with soft delete
    async deleteCampaign(id: number): Promise<any> {

        const campaign = await this.findCampaign(id);
        await this.campaignRepository.softDelete(campaign.id);

        return { message: `Campaign with ID ${id} successfully deleted.` };
    }


    async findCampaign(id: number): Promise<any> {
        return await this.campaignRepository.findOneBy({ id });
    }

    async updateCampaign(id: number, updateCampaignDto: any): Promise<any> {
        const campaign = await this.findCampaign(id);
        
        const startDate = updateCampaignDto.startDate ?? campaign.startDate;
        const endDate = updateCampaignDto.endDate ?? campaign.endDate;
        const status = updateCampaignDto.status ?? campaign.status;
    
        updateCampaignDto.status = validateCampaignDates(
            startDate,
            endDate,
            status,
        );
    
        Object.assign(campaign, updateCampaignDto);
        return this.campaignRepository.save(campaign);
    }

    async listCampaigns(): Promise<any> {
        return await this.campaignRepository.find();
    }
}

