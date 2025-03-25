import { Update, Start, Hears, InjectBot, Action, On } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { BotService } from './bot.service';
import { generateMessageCustomVND, generateMessageCustomUSD, generateMessageUSD, generateMessageVND, generateMessageWeather } from './utils/constants';
import { BotContext } from './utils/session.interface';
import { Message } from 'telegraf/types';
import { keyboards, inlineKeyboards } from './utils/buttons';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService
  ) {}

  @Start()
  async onStart(ctx: Context) {
    await ctx.reply('Выберите действие:', keyboards.start);
  }

  @Hears('🌦 Текущая погода')
  async onWeatherRequest(ctx: Context) {
    const weather = await this.appService.getSavedWeather();
    if (!weather) {
      await ctx.reply('Нет данных о погоде!');
      return;
    }
    const message = generateMessageWeather(weather);
    await ctx.reply(message);
  }

  @Hears('💰 Курс валют')
  async onCourseRequest(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют!');
      return;
    }
    const message = generateMessageUSD(course);
    await ctx.reply(message, inlineKeyboards.usd);
  }

  @Action('convert_to_vnd')
  async onConvertToVND(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют!');
      return;
    }
    const message = generateMessageVND(course);
    await ctx.editMessageText(message, inlineKeyboards.vnd);
  }

  @Action('convert_to_usd')
  async onConvertToUSD(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют!');
      return;
    }
    const message = generateMessageUSD(course);
    await ctx.editMessageText(message, inlineKeyboards.usd);
  }

  @Action('enter_custom_vnd')
  async onEnterCustomVND(ctx: BotContext) {
    await ctx.reply('Введите сумму в донгах, которую хотите пересчитать:');
    ctx.session.waitingForVNDInput = true;
  }

  @Action('enter_custom_usd')
  async onEnterCustomUSD(ctx: BotContext) {
    await ctx.reply('Введите сумму в долларах, которую хотите пересчитать:');
    ctx.session.waitingForUSDInput = true;
  }

  @On('text')
  async onUserInputCurrency(ctx: BotContext) {
    if (!ctx.session.waitingForVNDInput && !ctx.session.waitingForUSDInput) {
      return;
    }

    if (!ctx.message) {
      await ctx.reply('❌ Отправьте текстовое сообщение!');
      return;
    }

    const textMessage = ctx.message as Message.TextMessage;
    if (!textMessage.text) {
      await ctx.reply('❌ Отправьте текстовое сообщение!');
      return;
    }

    const input = textMessage.text.trim();
    if (!/^\d+$/.test(input)) {
      await ctx.reply('❌ Введите корректное число без пробелов, точек и запятых! (пример: 250000)');
      return;
    }

    const amount = parseInt(input, 10);
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют!');
      return;
    }

    if (ctx.session.waitingForVNDInput) {
      const message = generateMessageCustomVND(course, amount);
      await ctx.reply(message, inlineKeyboards.vnd);
      ctx.session.waitingForVNDInput = false;
    } else if (ctx.session.waitingForUSDInput) {
      const message = generateMessageCustomUSD(course, amount);
      await ctx.reply(message, inlineKeyboards.usd);
      ctx.session.waitingForUSDInput = false;
    }
  }
}
