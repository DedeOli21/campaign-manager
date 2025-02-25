import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';

@Module({
  providers: [CampaignService],
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  exports: [CampaignService],
})
export class CampaignModule {}
