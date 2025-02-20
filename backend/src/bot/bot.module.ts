import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { session } from 'telegraf';
import * as LocalSession from 'telegraf-session-local';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      middlewares: [
        session(),
        new (LocalSession as any).default({ database: 'sessions_db.json' }).middleware(), // Исправленный импорт
      ],
    }),
  ],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
