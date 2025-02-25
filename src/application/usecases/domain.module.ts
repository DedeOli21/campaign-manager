import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';

const usecases = [
    CampaignModule
]

@Module({
    imports: usecases,
    exports: usecases
})

export class DomainModule {}