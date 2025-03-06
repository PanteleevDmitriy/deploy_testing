import { Module, forwardRef } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { BotController } from './bot.controller';
import LocalSession = require('telegraf-session-local');
import { SequelizeModule } from '@nestjs/sequelize';
import { MoneyCourse, Weather } from './bot.model';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([MoneyCourse, Weather]),
    forwardRef(() => UsersModule),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
        launchOptions: {
          webhook: {
            domain: 'https://seawindtravel.ru', // Домен твоего сервера
            hookPath: '/api/bot/webhook', // Путь для обработки запросов от Telegram
          },
        },
        middlewares: [
          new LocalSession({ database: 'sessions_db.json' }).middleware(),
        ],
        telegram: {
          webhookReply: true,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [BotController],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
