import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/../models/entities/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../models/subscribers/**/*{.ts,.js}'],
  seeds: [__dirname + '/seeders/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
  synchronize: false,
  extra: {
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
  },
  
} as DataSourceOptions);

dataSource.initialize();
