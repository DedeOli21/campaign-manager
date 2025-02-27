import { Campaign } from '@domain/entities/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignImplementation } from './campaign.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [
    { provide: CampaignRepository, useClass: CampaignImplementation },
  ],
  exports: [CampaignRepository],
})
export class DatabaseModule {}
