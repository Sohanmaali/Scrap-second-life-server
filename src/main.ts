import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://aok-ui.onrender.com',
      'http://192.168.31.127:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

  await app.listen(process.env.PORT);
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
}
bootstrap();
