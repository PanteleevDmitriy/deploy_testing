import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

@Controller('bot')
export class BotController {
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  @Post('/webhook')
  async onUpdate(@Req() request: Request) {
    await this.bot.handleUpdate(request.body);
  }
}
