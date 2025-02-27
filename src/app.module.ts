import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from '@app/usecases/application.module';
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
    ApplicationModule,
    PresentationModule,
    DatabaseModule,
  ],
})
export class AppModule {}
