import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { Campaign } from '@domain/entities/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
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
    const campaing = this.campaignRepository.create(createCampaignDto);
    return await this.campaignRepository.save(campaing);
  }

  async deleteCampaign(
    deleteCampaignDto: DeleteCampaignDto,
  ): Promise<ResponseDeleteDto> {
    await this.campaignRepository.softDelete(deleteCampaignDto.id);

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
    return await this.campaignRepository.save(updateCampaignDto);
  }

  async listCampaigns(): Promise<Campaign[]> {
    return await this.campaignRepository.find();
  }
}
