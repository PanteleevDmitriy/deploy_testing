import { Module, forwardRef } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module'; 
import { UsersService } from '../users/users.service';
import LocalSession = require('telegraf-session-local');

@Module({
  imports: [
    ConfigModule, // ✅ Добавили ConfigModule для работы с .env
    forwardRef(() => UsersModule), // ✅ Подключили UsersModule
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'), // ✅ Загружаем токен из .env
        middlewares: [
          new LocalSession({ database: 'sessions_db.json' }).middleware(),
        ],
      }),
      inject: [ConfigService], // ✅ Внедряем ConfigService
    }),
  ],
  providers: [BotService, BotUpdate, UsersService], // ✅ Добавили UsersService
  exports: [BotService], // ✅ Экспортируем BotService, если нужно
})
export class BotModule {}
