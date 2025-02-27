import { Campaign } from '@domain/campaign/campaign.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
require('dotenv').config();

let config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Campaign],
  synchronize: false,
  migrationsRun: false,
  migrations: ['dist/migrations/*.js'],
};

    config = {
        ...config,
        migrationsRun: false,
        migrationsTransactionMode: 'each',
        synchronize: false,
    };

export const datasource = new DataSource(config);
export { config };