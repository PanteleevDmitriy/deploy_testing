import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import LocalSession = require('telegraf-session-local');
import { BotUpdate } from './bot.update';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // Добавляем ConfigModule, чтобы работать с переменными окружения
    TelegrafModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'), // Загружаем токен из .env
        middlewares: [
          new LocalSession({ database: 'sessions_db.json' }).middleware(),
        ],
      }),
      inject: [ConfigService], // Внедряем ConfigService
    }),
  ],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
