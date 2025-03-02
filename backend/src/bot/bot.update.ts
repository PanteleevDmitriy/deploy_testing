import { Update, Start, Hears, InjectBot, Action } from 'nestjs-telegraf';
import { Telegraf, Context, Markup } from 'telegraf';
import { BotService } from './bot.service';
import { generateMessageUSD, generateMessageVND, generateMessageWeather } from './bot.constants';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService
  ) {}

  @Start()
  async onStart(ctx: Context) {
    await ctx.reply(
      `Выберите действие:`,
      Markup.keyboard([
        ['💰 Курс валют', '🌦 Текущая погода']
      ]).resize()
    );
  }

  @Hears('🌦 Текущая погода')
  async onWeatherRequest(ctx: Context) {
    const weather = await this.appService.getSavedWeather();
    if (!weather) {
      await ctx.reply('Нет данных о погоде.');
      return;
    }
    const message = generateMessageWeather(weather);
    await ctx.reply(message);
  }

  @Hears('💰 Курс валют')
  async onCourseRequest(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = generateMessageUSD(course);
    await ctx.reply(message, Markup.inlineKeyboard([
      Markup.button.callback('💱 Курс вьетнамского донга', 'convert_to_vnd')
    ]));
  }

  @Action('convert_to_vnd')
  async onConvertToVND(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = generateMessageVND(course);
    await ctx.editMessageText(message, Markup.inlineKeyboard([
      Markup.button.callback('💲 Курс доллара', 'convert_to_usd')
    ]));
  }

  @Action('convert_to_usd')
  async onConvertToUSD(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = generateMessageUSD(course);
    await ctx.editMessageText(message, Markup.inlineKeyboard([
      Markup.button.callback('💱 Курс вьетнамского донга', 'convert_to_vnd')
    ]));
  }
}
