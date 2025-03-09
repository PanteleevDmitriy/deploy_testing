import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as fastifyHelmet from 'fastify-helmet';
import * as fastifyCookie from '@fastify/cookie';
import * as fastifyCors from '@fastify/cors';
import * as fastifyRawBody from 'fastify-raw-body';
import serveStatic = require('@fastify/static');
import * as pointOfView from 'point-of-view';
import * as handlebars from 'handlebars';
import { join } from 'path';

const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET || 'SEKRETA_NET';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Статические файлы через @fastify/static
  await app.register((serveStatic as any).default || serveStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  // Подключаем необходимые middleware
  await app.register(fastifyCookie as any, { secret: SECRET });
  await app.register(fastifyRawBody as any, { global: false });
  await app.register(fastifyHelmet);
  await app.register(fastifyCors as any, {
    origin: ['http://localhost:3000', 'http://seawindtravel.ru'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  // Регистрация pointOfView и handlebars
  await app.register(pointOfView, {
    engine: { handlebars },
    templates: 'views',
  });

  // Запуск сервера
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server started on http://localhost:${PORT}`);
}

bootstrap();
