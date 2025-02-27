import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { Campaign } from '@domain/campaign/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';
import { Repository } from 'typeorm';

export class CampaignImpl implements CampaignRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
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

  async deleteCampaign(deleteCampaignDto: DeleteCampaignDto): Promise<object> {
    const campaign = await this.findCampaign({ id: deleteCampaignDto.id });
    await this.campaignRepository.softDelete(campaign.id);

    return {
      message: `Campaign with ID ${deleteCampaignDto.id} successfully deleted.`,
    };
  }

  async findCampaign(findCampaignDto: FindCampaignDto): Promise<Campaign> {
    return await this.campaignRepository.findOneBy({ id: findCampaignDto.id });
  }

  async updateCampaign(
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    try {
      const campaign = await this.findCampaign({ id: updateCampaignDto.id });

      if (!campaign) {
        throw new Error('Campaign not found');
      }

      console.log('updateCampaignDto', updateCampaignDto);
      console.log('campaign', campaign);

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
    } catch (error) {
      throw new Error(error);
    }
  }

  async listCampaigns(): Promise<any> {
    return await this.campaignRepository.find();
  }
}
