import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { FindAllCampaignUseCase } from '@app/usecases/campaign/findAll-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { Module } from '@nestjs/common';


@Module({
  providers: [
    CreateCampaignUseCase,
    FindCampaignUseCase,
    FindAllCampaignUseCase,
    DeleteCampaignUseCase,
    UpdateCampaignUseCase
  ],
  exports: [
    CreateCampaignUseCase,
    CreateCampaignUseCase,
    FindCampaignUseCase,
    FindAllCampaignUseCase,
    DeleteCampaignUseCase,
    UpdateCampaignUseCase
  ],
})
export class CampaignModule {}
