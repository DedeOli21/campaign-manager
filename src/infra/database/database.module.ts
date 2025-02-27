import { Campaign } from '@domain/campaign/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignImpl } from './campaign.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [{ provide: CampaignRepository, useClass: CampaignImpl }],
  exports: [CampaignRepository],
})
export class DatabaseModule {}
