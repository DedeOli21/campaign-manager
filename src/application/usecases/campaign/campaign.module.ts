import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { ListCampaignUseCase } from '@app/usecases/campaign/list-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateCampaignUseCase,
    FindCampaignUseCase,
    ListCampaignUseCase,
    DeleteCampaignUseCase,
    UpdateCampaignUseCase,
  ],
  exports: [
    CreateCampaignUseCase,
    CreateCampaignUseCase,
    FindCampaignUseCase,
    ListCampaignUseCase,
    DeleteCampaignUseCase,
    UpdateCampaignUseCase,
  ],
})
export class CampaignModule {}
