import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignModule } from './presentation/campaign/campaign.module';
import { DomainModule } from '@app/usecases/domain.module';
import { DatabaseModule } from './infra/database/database.module';
import { DataBaseConnectionService } from '@shared/databases/campaing';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from '@presentation/presentation.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DomainModule,
    PresentationModule,
    DatabaseModule
  ],
})
export class AppModule {}
