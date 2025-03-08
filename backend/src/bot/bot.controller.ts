import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { Update } from 'telegraf/typings/core/types/typegram'; // ✅ Добавляем импорт типов

@Controller('bot')
export class BotController {
  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

  @Post('/webhook')
  async onUpdate(@Req() request: FastifyRequest<{ Body: Update }>, @Res() reply: FastifyReply) {
    try {
      await this.bot.handleUpdate(request.body); // ✅ request.body теперь типа Update
      return reply.status(200).send(); // ✅ 200 OK
    } catch (error) {
      console.error('Ошибка в onUpdate:', error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  @Get('/health')
  async healthCheck(@Res() reply: FastifyReply) {
    return reply.status(200).send({ status: 'ok' }); // ✅ Хэлсчек работает
  }
}
