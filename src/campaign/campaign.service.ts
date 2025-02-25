import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
      ) {}

      async findAll(): Promise<Campaign[]> {
        return this.campaignRepository.find();
      }

      async create(campaign: Campaign): Promise<Campaign> {
        const { endDate, startDate } = campaign;

        if (endDate < startDate) {
          throw new Error('End date must be greater than start date');
        }

        return this.campaignRepository.save(campaign);
      }

      async findOne(id: number): Promise<Campaign> {
        const campaign = await this.campaignRepository.findOne({ where: { id } });
        if (!campaign) throw new NotFoundException('Campaing not found');
        return campaign;
      }

      async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
        const campaign = await this.findOne(id);
        Object.assign(campaign, updateCampaignDto);
        return this.campaignRepository.save(campaign);
      }

      async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.campaignRepository.delete(id)
      }
}
