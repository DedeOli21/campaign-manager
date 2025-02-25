import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { validateCampaignDates } from '../shared/helpers/verify-date.helper';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find();
  }

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const { startDate, endDate, status } = createCampaignDto;

    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const validatedStatus = validateCampaignDates(startDate, endDate, status);

    return this.campaignRepository.save({
      ...createCampaignDto,
      status: validatedStatus,
    });
  }

  async findOne(id: number): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found.`);
    }

    return campaign;
  }

  async update(
    id: number,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id);

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

  async remove(id: number): Promise<{ message: string }> {
    const campaign = await this.findOne(id);
    await this.campaignRepository.softDelete(campaign.id);

    return { message: `Campaign with ID ${id} successfully deleted.` };
  }
}
