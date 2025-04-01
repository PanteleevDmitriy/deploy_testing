import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { MoneyCourse, Weather } from './bot.model';
import { WeatherDto } from './dto/weather.dto';
import { getWeather1 } from './utils/weather';
import getCourse from './utils/money-course';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService implements OnModuleInit {
    private isWeatherRunning = false;
    private isMoneyRunning = false;
    private weatherToken: string;
    private moneyToken: string;

    constructor(
        @InjectBot() private bot: Telegraf,
        @InjectModel(MoneyCourse) private moneyRepository: typeof MoneyCourse,
        @InjectModel(Weather) private weatherRepository: typeof Weather,
        private configService: ConfigService
    ) {
        this.weatherToken = this.configService.get<string>('WEATHER_TOKEN');
        this.moneyToken = this.configService.get<string>('MONEY_TOKEN');

        if (!this.weatherToken) {
            console.error("❌ API-ключ для погоды отсутствует!");
        }
        if (!this.moneyToken) {
            console.error("❌ API-ключ для валют отсутствует!");
        }
    }

    private formatTime(date: string | number): string {
        return new Date(date).toLocaleString('ru-RU', {
            timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit'
        });
    }

    async checkWeather() {
        if (this.isWeatherRunning) return;
        this.isWeatherRunning = true;

        while (this.isWeatherRunning) {
            try {
                if (!this.weatherToken) {
                    throw new Error("❌ API-ключ для погоды отсутствует!");
                }
                
                const weatherRawData = await getWeather1(this.weatherToken);
                if (!weatherRawData) {
                    throw new Error("❌ Неверные данные о погоде!");
                }
                
                const weatherDto: WeatherDto = {
                    time_point: 0,
                    time_value: this.formatTime(weatherRawData.time),
                    temp: weatherRawData.temp,
                    humidity: weatherRawData.humidity,
                    pressure: weatherRawData.pressure,
                    wind_speed: weatherRawData.wind_speed,
                    wind_gust: weatherRawData.wind_gust,
                    wind_deg: weatherRawData.wind_deg,
                    clouds: weatherRawData.clouds,
                    rain_1h: weatherRawData.rain_1h,
                    rain_3h: weatherRawData.rain_3h,
                    sunrise: this.formatTime(weatherRawData.sunrise),
                    sunset: this.formatTime(weatherRawData.sunset),
                    icon: weatherRawData.icon,
                    description: weatherRawData.description,
                    visibility: weatherRawData.visibility,
                    pop: 0, 
                };

                await this.weatherRepository.upsert(weatherDto);
            } catch (error) {
                console.error('❌ Ошибка получения погоды:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 600000));
        }
    }

    async updateMoneyCourse() {
        if (this.isMoneyRunning) return;
        this.isMoneyRunning = true;
    
        while (this.isMoneyRunning) {
            try {
                console.log("🔄 Начало обновления курса валют...");
    
                if (!this.moneyToken) {
                    throw new Error("❌ API-ключ для валют отсутствует!");
                }
    
                // Получаем последнее сохранённое значение курса
                const lastCourse = await this.moneyRepository.findOne({ order: [['time', 'DESC']] });
                // console.log("📊 Последний сохранённый курс:", lastCourse?.dataValues);
    
                if (lastCourse) {
                    const lastUpdateTime = new Date(lastCourse.time).getTime();

                    // console.log(`⏱ Время последнего обновления (timestamp): ${lastUpdateTime}`);

                    const currentTime = Date.now();
    
                    // console.log(`⏱ Текущее время (timestamp): ${currentTime}`);

                    const hoursSinceLastUpdate = (currentTime - lastUpdateTime) / (1000 * 60 * 60);
    
                    console.log(`⏱ Последнее обновление было ${hoursSinceLastUpdate.toFixed(2)} часов назад.`);
    
                    if (hoursSinceLastUpdate < 7.5) {
                        console.log("⏳ Курс валют ещё не требует обновления. Повторная проверка через 1 час.");
                        await new Promise(resolve => setTimeout(resolve, 3600000)); // Ждём 1 час перед следующей проверкой
                        continue;
                    }
                }
    
                // Запрос новых данных
                console.log("🌐 Запрос курса валют через API...");
                let courseData = await getCourse(this.moneyToken);
                // console.log("📥 Данные от API:", courseData);
    
                // Проверка на корректность данных
                if (!courseData || typeof courseData !== "object") {
                    throw new Error("❌ Неверные данные по курсам валют!");
                }
    
                if (!courseData.usd || !courseData.vnd) {
                    console.error("❌ Ошибка: В API-ответе нет курса USD или VND!", courseData);
                    throw new Error("❌ В API-ответе отсутствуют важные валютные данные!");
                }
    
                // Сохраняем новый курс с текущим временем в ISO-формате
                const updatedData = { ...courseData, time: new Date().toISOString() };
                // console.log("💾 Данные для сохранения:", updatedData);
    
                await this.moneyRepository.upsert(updatedData);
                console.log("✅ Курс валют обновлён:", updatedData);
    
            } catch (error) {
                console.error('❌ Ошибка получения курса валют:', error.message);
            }
    
            await new Promise(resolve => setTimeout(resolve, 28800000)); // Проверяем снова через 8 часов
        }
    }
    

    async getSavedWeather() {
        return await this.weatherRepository.findOne({ order: [['time_value', 'DESC']] });
    }

    async getSavedCourse() {
        return await this.moneyRepository.findOne({ order: [['time', 'DESC']] });
    }

    stopWeatherCheck() {
        this.isWeatherRunning = false;
        console.log('⚠️ Мониторинг погоды остановлен.');
    }

    stopMoneyCheck() {
        this.isMoneyRunning = false;
        console.log('⚠️ Мониторинг курса валют остановлен.');
    }

    async onModuleInit() {
        const webhookUrl = `https://seawindtravel.ru/api/bot/webhook`;
    
        try {
            // Получаем текущий вебхук
            const webhookInfo = await this.bot.telegram.getWebhookInfo();
            console.log(`🌍 Текущий Webhook: ${webhookInfo.url || "❌ Не установлен"}`);
    
            // Если вебхук не совпадает — сначала удаляем старый
            if (webhookInfo.url && webhookInfo.url !== webhookUrl) {
                console.log("🛠️ Удаляю старый Webhook...");
                await this.bot.telegram.deleteWebhook();
                console.log("✅ Старый Webhook удалён.");
            }
    
            // Если вебхук не установлен или не совпадает, устанавливаем новый
            if (!webhookInfo.url || webhookInfo.url !== webhookUrl) {
                console.log("🚀 Устанавливаю новый Webhook...");
                const response = await this.bot.telegram.setWebhook(webhookUrl, {
                    allowed_updates: ["message", "callback_query"],
                    drop_pending_updates: true, // Удаляем старые запросы, если бот был оффлайн
                });
    
                if (response) {
                    console.log(`✅ Webhook успешно установлен: ${webhookUrl}`);
                } else {
                    console.error("❌ Ошибка при установке Webhook!");
                }
            } else {
                console.log("🔹 Webhook уже установлен, пропускаю.");
            }
        } catch (error) {
            console.error("❌ Ошибка при настройке Webhook:", error);
        }
    
        // Запускаем фоновые задачи
        this.checkWeather();
        this.updateMoneyCourse();
    }
}
