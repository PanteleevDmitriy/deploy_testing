import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { session } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN, // Хранение токена в .env
      middlewares: [
        session(),
        new LocalSession({ database: 'sessions_db.json' }).middleware(), // Локальные сессии
      ],
    }),
  ],
  providers: [BotService, BotUpdate],
})
export class BotModule {}