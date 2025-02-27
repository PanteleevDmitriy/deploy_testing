import { Update, Start, Hears, InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService
  ) {}

  @Start()
  async onStart(ctx: Context) {
    await ctx.reply(`Привет!`);
  }

  @Hears('погода')
  async onWeatherRequest(ctx: Context) {
    const weather = await this.appService.getSavedWeather();
    if (!weather) {
      await ctx.reply('Нет данных о погоде.');
      return;
    }
    const message = `📅 Время: ${weather.time_value}
🌡 Температура: ${weather.temp}°C
💧 Влажность: ${weather.humidity}%
🌀 Давление: ${weather.pressure} мм рт. ст.
🌬 Ветер: ${weather.wind_speed} м/с, порывы до ${weather.wind_gust} м/с
💨 Облачность: ${weather.clouds}%
🌧 Дождь за 1ч: ${weather.rain_1h} мм
🌧 Дождь за 3ч: ${weather.rain_3h} мм
🌅 Восход: ${weather.sunrise}
🌇 Закат: ${weather.sunset}
🌫 Видимость: ${weather.visibility} м
📌 Описание: ${weather.description}`;
    await ctx.reply(message);
  }

  @Hears('курс')
  async onCourseRequest(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = `📅 Время: ${course.time}
💰 Курс валют:
🇷🇺 RUB: ${course.rub}
🇻🇳 VND: ${course.vnd}
🇨🇳 CNY: ${course.china}
🇯🇵 JPY: ${course.japan}
🇱🇦 LAK: ${course.laos}
🇹🇭 THB: ${course.tailand}
🇰🇭 KHR: ${course.kambodja}
🇰🇿 KZT: ${course.kz}
🇰🇷 KRW: ${course.korea}
🇰🇬 KGS: ${course.kirgizstan}
🇺🇿 UZS: ${course.uzbekistan}
🇮🇳 INR: ${course.india}
🇲🇾 MYR: ${course.malaysia}
🇪🇺 EUR: ${course.euro}
🇹🇷 TRY: ${course.lira}
🇬🇧 GBP: ${course.funt}`;
    await ctx.reply(message);
  }
}
