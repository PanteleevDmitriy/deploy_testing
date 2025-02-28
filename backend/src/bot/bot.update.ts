import { Update, Start, Hears, InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context, Markup } from 'telegraf';
import { BotService } from './bot.service';

const iconDict: Record<string, string> = {
  "01d": "☀", "02d": "🌤", "03d": "⛅", "04d": "☁",
  "09d": "⛈", "10d": "⛈", "11d": "⛈", "13d": "🌨", "50d": "🌫",
  "01n": "🌑", "02n": "☁", "03n": "☁", "04n": "☁",
  "09n": "⛈", "10n": "⛈", "11n": "⛈", "13n": "🌨", "50n": "🌫"
};

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService
  ) {}

  @Start()
  async onStart(ctx: Context) {
    await ctx.reply(
      `Привет! Выберите действие:`,
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
${iconDict[weather.icon] || "📌"} ${weather.description}`;    
await ctx.reply(message);
  }

  @Hears('💰 Курс валют')
  async onCourseRequest(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = `📅 Время: ${course.time}
💰 Курс валют к 1$ (usd):
🇷🇺 RUB: ${Number(course.rub).toFixed(2)}
🇻🇳 VND: ${Number(course.vnd).toFixed(0)}
🇨🇳 CNY: ${Number(course.china).toFixed(3)}
🇯🇵 JPY: ${Number(course.japan).toFixed(2)}
🇱🇦 LAK: ${Number(course.laos).toFixed(0)}
🇹🇭 THB: ${Number(course.tailand).toFixed(2)}
🇰🇭 KHR: ${Number(course.kambodja).toFixed(0)}
🇰🇿 KZT: ${Number(course.kz).toFixed(2)}
🇰🇷 KRW: ${Number(course.korea).toFixed(0)}
🇰🇬 KGS: ${Number(course.kirgizstan).toFixed(2)}
🇺🇿 UZS: ${Number(course.uzbekistan).toFixed(0)}
🇮🇳 INR: ${Number(course.india).toFixed(2)}
🇲🇾 MYR: ${Number(course.malaysia).toFixed(3)}
🇪🇺 EUR: ${Number(course.euro).toFixed(3)}
🇹🇷 TRY: ${Number(course.lira).toFixed(2)}
🇬🇧 GBP: ${Number(course.funt).toFixed(3)}`;
    await ctx.reply(message);
  }
}
