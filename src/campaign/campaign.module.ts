import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';

@Module({
  providers: [CampaignService],
  imports: [TypeOrmModule.forFeature([Campaign])],

  exports: [CampaignService],
})
export class CampaignModule {}
