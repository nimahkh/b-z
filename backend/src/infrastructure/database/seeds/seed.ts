import 'reflect-metadata';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import { seedUsers } from './userSeeder';
import { seedTasks } from './taskSeeder';
import { Container } from 'typedi';

DatabaseConfig.initialize()
  .then(async () => {
    Container.set('DatabaseConfig', DatabaseConfig);
    await seedUsers(DatabaseConfig);
    await seedTasks(DatabaseConfig);
    process.exit();
  })
  .catch((error) => {
    console.error('Error during Data Seeding: ', error);
    process.exit();
  });
