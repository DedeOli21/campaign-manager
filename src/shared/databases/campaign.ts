import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: Number(this.configService.get<number>('TYPEORM_PORT')),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      entities: [this.configService.get<string>('TYPEORM_ENTITIES')],
      synchronize: this.configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
    };
  }
}
