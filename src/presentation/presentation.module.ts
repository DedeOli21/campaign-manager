import { Module } from '@nestjs/common';
import { ApplicationModule } from '@app/usecases/application.module';
import { CampaignController } from './controller/campaign.controller';

@Module({
  imports: [ApplicationModule],
  providers: [],
  controllers: [CampaignController],
})
export class PresentationModule {}
