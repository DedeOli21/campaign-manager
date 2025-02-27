import { Module } from '@nestjs/common';
import { DomainModule } from '@app/usecases/domain.module';
import { CampaignController } from './controller/campaign.controller';

@Module({
  imports: [DomainModule],
  providers: [],
  controllers: [CampaignController],
})
export class PresentationModule {}
