import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '@/domains/authentication/domain/entities/User';
import { Task } from '@/domains/task/domain/entity/Task';

const port = (process.env.DB_PORT as unknown as number) || 5432;

export const DatabaseConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Task],
  migrations: ['src/infrastructure/database/migration/**/*.ts'],
  ssl:
    process.env.DB_SSL_MODE === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});
