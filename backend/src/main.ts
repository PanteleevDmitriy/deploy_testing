import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as pointOfView from 'point-of-view';
import * as handlebars from 'handlebars';
import fastifyHelmet from 'fastify-helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyRawBody from 'fastify-raw-body';

const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET || 'SEKRETA_NET';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Разрешение для статических файлов
  app.useStaticAssets({ root: join(__dirname, '..', 'public') });

  // Регистрация middleware
  await app.register(fastifyCookie as any, { secret: SECRET });
  await app.register(fastifyRawBody as any, { global: false });
  await app.register(fastifyHelmet);
  await app.register(pointOfView, {
    engine: { handlebars },
    templates: 'views',
  });

  // Настройка Swagger
  const swagger_options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API документация')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('others')
    .build();

  const document = SwaggerModule.createDocument(app, swagger_options);
  SwaggerModule.setup('/swagger_doc', app, document);

  // Регистрация Cookie и CORS
  await app.register(fastifyCors as any, {
    origin: ['http://localhost:3000', 'http://seawindtravel.ru'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  // Запуск сервера
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server started on http://localhost:${PORT}`);
}

bootstrap();
