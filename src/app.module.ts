import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignModule } from './presentation/campaign/campaign.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'campaigns_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CampaignModule,
  ],
})
export class AppModule {}
