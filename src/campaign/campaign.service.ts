import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
      ) {}

      async findAll(): Promise<Campaign[]> {
        return this.campaignRepository.find();
      }
}
