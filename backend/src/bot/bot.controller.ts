import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotService } from './bot.service';
import { CaptchaService } from '../captcha/captcha.service';  // Импортируем сервис капчи

@Controller('bot')
export class BotController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<any>,
    private readonly botService: BotService,
    private readonly captchaService: CaptchaService,  // Инжектируем сервис капчи
  ) {}

  @Post('/webhook')
  async onUpdate(
    @Req() request: FastifyRequest<{ Body: Update }>,
    @Res() reply: FastifyReply,
  ) {
    try {
      await this.bot.handleUpdate(request.body);
      return reply.status(200).send();
    } catch (error) {
      console.error('Ошибка в onUpdate:', error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  }

  @Get('/health')
  async healthCheck(@Res() reply: FastifyReply) {
    return reply.status(200).send({ status: 'ok' });
  }

  @Post('/send-request')
  async sendExcursionRequest(
    @Body() body: { text: string, recaptchaToken: string },
    @Res() reply: FastifyReply,
  ) {
    try {
      if (!body.text) {
        return reply.status(400).send({ error: 'Текст заявки обязателен' });
      }

      // Используем сервис капчи для валидации
      await this.captchaService.verifyToken(body.recaptchaToken);

      await this.botService.sendExcursionRequestToGroup(body.text);
      return reply.status(200).send({ status: 'ok' });
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      return reply.status(500).send({ error: 'Ошибка сервера' });
    }
  }
}
