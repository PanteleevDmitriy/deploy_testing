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
import { HttpModule } from '@nestjs/axios';
import { CaptchaModule } from '../captcha/captcha.module';  // Импортируем модуль капчи

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
            domain: 'https://seawindtravel.ru',  // Твой домен для вебхука
            hookPath: '/api/bot/webhook',  // Путь вебхука
          },
        },
        middlewares: [
          new LocalSession({ database: 'sessions_db.json' }).middleware(),
          async (ctx, next) => {
            const messageTime = ctx.message?.date;
            const now = Math.floor(Date.now() / 1000);

            if (messageTime && now - messageTime > 10) {
              console.log('❌ Старое сообщение, игнорируем:', ctx.message.text);
              return;
            }

            await next(); // Пропускаем дальше, если сообщение свежее
          },
        ],
        telegram: {
          webhookReply: true,  // Включаем возможность ответа через вебхук
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,  // Подключаем HttpModule для работы с axios
    CaptchaModule,  // Подключаем модуль капчи
  ],
  controllers: [BotController],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
