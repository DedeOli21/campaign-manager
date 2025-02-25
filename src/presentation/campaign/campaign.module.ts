import { Module } from '@nestjs/common';
import { CreateCampaignUseCase } from '@app/campaign/create-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/campaign/delete-campaign.use-case';
import { FindCampaignUseCase } from '@app/campaign/find-campaign.use-case';
import { FindAllCampaignUseCase } from '@app/campaign/findAll-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/campaign/update-campaign.use-case';
import { CampaignController } from '@presentation/controller/campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '@domain/campaign/campaign.entity';

@Module({
  providers: [],
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  exports: [
    CreateCampaignUseCase,
    DeleteCampaignUseCase,
    FindCampaignUseCase,
    FindAllCampaignUseCase,
    UpdateCampaignUseCase,
  ],
})
export class CampaignModule {}
