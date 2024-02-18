import 'reflect-metadata';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from '@/infrastructure/web/routes';
import { Container } from 'typedi';

DatabaseConfig.initialize()
  .then(async () => {
    Container.set('DatabaseConfig', DatabaseConfig);
    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(bodyParser.json());

    app.use(router);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
