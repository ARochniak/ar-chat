import fastifyHelmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: configService
      .get('ALLOWED_ORIGINS')
      ?.split(' ')
      .map(origin => new RegExp(origin)),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.register(fastifyHelmet);

  await app.listen(configService.get('PORT'), '0.0.0.0');
}
bootstrap();
