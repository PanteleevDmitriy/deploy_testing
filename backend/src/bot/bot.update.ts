import { Update, Start, Hears, InjectBot, Action } from 'nestjs-telegraf';
import { Telegraf, Context, Markup } from 'telegraf';
import { BotService } from './bot.service';

const iconDict = {
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
    const message = `📅 Время прогноза: ${weather.time_value}

🌡 Температура: ${weather.temp}°C
💧 Влажность: ${weather.humidity}%
🌀 Давление: ${weather.pressure} мм рт. ст.
🌬 Ветер: ${weather.wind_speed} м/с, порывы до ${weather.wind_gust} м/с
💨 Облачность: ${weather.clouds}%
🌧 Дождь за последний час: ${weather.rain_1h} мм
🌧 Дождь за последние 3 часа: ${weather.rain_3h} мм
🌅 Восход: ${weather.sunrise}
🌇 Закат: ${weather.sunset}
🌫 Видимость: ${weather.visibility} м
${iconDict[weather.icon] || "📌"} Описание: ${weather.description}`;    
    await ctx.reply(message);
  }

  @Hears('💰 Курс валют')
  async onCourseRequest(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = `📅 Время обновления: ${course.time}

💰 Курс валют за 1 доллар США (USD):
🇻🇳 Вьетнамский донг (VND): ${Number(course.vnd).toFixed(0)}
🇷🇺 Российский рубль (RUB): ${Number(course.rub).toFixed(2)}
🇰🇿 Казахский тенге (KZT): ${Number(course.kz).toFixed(2)}
🇰🇬 Киргизский сом (KGS): ${Number(course.kirgizstan).toFixed(2)}
🇺🇿 Узбекский сум (UZS): ${Number(course.uzbekistan).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${Number(course.china).toFixed(3)}
🇰🇷 Южнокорейская вона (KRW): ${Number(course.korea).toFixed(0)}
🇯🇵 Японская иена (JPY): ${Number(course.japan).toFixed(2)}
🇹🇭 Тайский бат (THB): ${Number(course.tailand).toFixed(2)}
🇱🇦 Лаосский кип (LAK): ${Number(course.laos).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${Number(course.kambodja).toFixed(0)}
🇮🇳 Индийская рупия (INR): ${Number(course.india).toFixed(2)}
🇲🇾 Малайзийский ринггит (MYR): ${Number(course.malaysia).toFixed(3)}
🇹🇷 Турецкая лира (TRY): ${Number(course.lira).toFixed(2)}
🇬🇧 Фунт стерлингов (GBP): ${Number(course.funt).toFixed(3)}
🇪🇺 Евро (EUR): ${Number(course.euro).toFixed(3)}`;

    await ctx.reply(message, Markup.inlineKeyboard([
      Markup.button.callback('💱 Курс донга к другим валютам', 'convert_to_vnd')
    ]));
  }

  @Action('convert_to_vnd')
  async onConvertToVND(ctx: Context) {
    const course = await this.appService.getSavedCourse();
    if (!course) {
      await ctx.reply('Нет данных о курсе валют.');
      return;
    }
    const message = `💰 Курс валют за 100.000 донгов (VND):
🇺🇸 Доллар США (USD): ${(100000 / Number(course.vnd)).toFixed(2)}
🇷🇺 Российский рубль (RUB): ${(Number(course.rub) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇿 Казахский тенге (KZT): ${(Number(course.kz) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${(Number(course.kirgizstan) / Number(course.vnd) * 100000).toFixed(0)}
🇺🇿 Узбекский сум (UZS): ${(Number(course.uzbekistan) / Number(course.vnd) * 100000).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${(Number(course.china) / Number(course.vnd) * 100000).toFixed(1)}
🇰🇷 Южнокорейская вона (KRW): ${(Number(course.korea) / Number(course.vnd) * 100000).toFixed(0)}
🇯🇵 Японская иена (JPY): ${(Number(course.japan) / Number(course.vnd) * 100000).toFixed(0)}
🇹🇭 Тайский бат (THB): ${(Number(course.tailand) / Number(course.vnd) * 100000).toFixed(0)}
🇱🇦 Лаосский кип (LAK): ${(Number(course.laos) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${(Number(course.kambodja) / Number(course.vnd) * 100000).toFixed(0)}
🇮🇳 Индийская рупия (INR): ${(Number(course.india) / Number(course.vnd) * 100000).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${(Number(course.malaysia) / Number(course.vnd) * 100000).toFixed(1)}
🇹🇷 Турецкая лира (TRY): ${(Number(course.lira) / Number(course.vnd) * 100000).toFixed(0)}
🇬🇧 Фунт стерлингов (GBP): ${(Number(course.funt) / Number(course.vnd) * 100000).toFixed(2)}
🇪🇺 Евро (EUR): ${(Number(course.euro) / Number(course.vnd) * 100000).toFixed(2)}`;

    await ctx.editMessageText(message, Markup.inlineKeyboard([
      Markup.button.callback('💲 Курс доллара', 'convert_to_usd')
    ]));
  }

  @Action('convert_to_usd')
  async onConvertToUSD(ctx: Context) {
    await this.onCourseRequest(ctx);
  }
}
