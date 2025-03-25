import { Update, Start, Hears, InjectBot, Action, On } from 'nestjs-telegraf';
import { Telegraf, Context, Markup } from 'telegraf';
import { BotService } from './bot.service';
import { generateMessageCustomVND, generateMessageUSD, generateMessageVND, generateMessageWeather } from './bot.constants';
import { BotContext } from './utils/session.interface';
import { Message } from 'telegraf/types'; // Импортируем тип Message


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
          Markup.button.callback('💲 Курс доллара', 'convert_to_usd'),
          Markup.button.callback('✏️ Введите сумму в донгах', 'enter_custom_vnd')
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

@Action('enter_custom_vnd')
async onEnterCustomVND(ctx: BotContext) {
    await ctx.reply('Введите сумму в донгах, которую хотите пересчитать:');
    ctx.session.waitingForVNDInput = true;
}

@On('text')
async onUserEnterVND(ctx: BotContext) {
    if (!ctx.session.waitingForVNDInput) {
        return;
    }

    // Проверяем, что ctx.message существует
    if (!ctx.message) {
        await ctx.reply('❌ Отправьте текстовое сообщение.');
        return;
    }

    // Явно указываем TypeScript, что это текстовое сообщение
    const textMessage = ctx.message as Message.TextMessage;

    if (!textMessage.text) {
        await ctx.reply('❌ Отправьте текстовое сообщение.');
        return;
    }

    const input = textMessage.text.trim();

    if (!/^\d+$/.test(input)) {
        await ctx.reply('❌ Введите корректное число без пробелов, точек и запятых (пример: 250000)');
        return;
    }

    const amount = parseInt(input, 10);

    const course = await this.appService.getSavedCourse();
    if (!course) {
        await ctx.reply('Нет данных о курсе валют.');
        return;
    }

    const message = generateMessageCustomVND(course, amount);
    await ctx.reply(message, Markup.inlineKeyboard([
        Markup.button.callback('💲 Курс доллара', 'convert_to_usd'),
        Markup.button.callback('✏️ Введите другую сумму', 'enter_custom_vnd')
    ]));

    ctx.session.waitingForVNDInput = false;
  }
}