import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { validateCampaignDates } from '@shared/helpers/verify-date.helper';
import { Repository } from 'typeorm';
import { ResponseDeleteDto } from '@infra/dto/response-delete.dto';

export class CampaignImplementation implements CampaignRepository {
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

  async deleteCampaign(deleteCampaignDto: DeleteCampaignDto): Promise<ResponseDeleteDto> {
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
      return this.campaignRepository.save(updateCampaignDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async listCampaigns(): Promise<any> {
    return await this.campaignRepository.find();
  }
}
