import { Module } from '@nestjs/common';
import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { ListCampaignUseCase } from '@app/usecases/campaign/list-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { CampaignController } from '@presentation/controller/campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '@domain/entities/campaign.entity';

@Module({
  providers: [],
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  exports: [
    CreateCampaignUseCase,
    DeleteCampaignUseCase,
    FindCampaignUseCase,
    ListCampaignUseCase,
    UpdateCampaignUseCase,
  ],
})
export class CampaignModule {}
