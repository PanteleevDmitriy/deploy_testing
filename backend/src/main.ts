import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as helmet from 'fastify-helmet';
import * as pointOfView from 'point-of-view';
import * as handlebars from 'handlebars';
import fastifyCookie from '@fastify/cookie';
const cors = require('@fastify/cors');


const PORT = process.env.PORT || 3001

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  app.useStaticAssets({ root: join(__dirname, '..', 'public') });
  app.register(helmet);
  app.register(pointOfView, {
    engine: {
      handlebars,
    },
    templates: 'views',
  });
  
  const swagger_options = new DocumentBuilder()
  .setTitle('NestJS test API')
  .setDescription('https://github.com/PanteleevDmitriy/NestJS.git')
  .setVersion('1.0')
  .addTag('users')
  .addTag('auth')
  .addTag('others')
  .build()

  const document = SwaggerModule.createDocument(app, swagger_options)
  SwaggerModule.setup('/swagger_doc', app, document)

  await app.register(fastifyCookie, {
    secret: 'my-secret-cookie-qwerty'
  });
  app.register(cors, {
    origin: [
      'http://localhost:3000', 
      'http://seawindtravel.ru',
    ], // Разрешить запросы
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если куки или аутентификация
    optionsSuccessStatus: 204, // Некоторые браузеры ожидают статус 204
  });
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server has been started on http://localhost:${PORT}`)
});
}

bootstrap();
