import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MoneyCourse, Weather } from './bot.model';
import { WeatherDto } from './dto/weather.dto';
import { MoneyCourseDto } from './dto/money-course.dto';

@Injectable()
export class BotService implements OnModuleInit {
    private isWeatherRunning = false; // Флаг для управления циклом

    constructor(
        @InjectModel(MoneyCourse) private moneyRepository: typeof MoneyCourse,
        @InjectModel(Weather) private weatherRepository: typeof Weather,
    ) {}

    async updateWeatherData(dto: WeatherDto) {
        return await this.weatherRepository.upsert(dto);
    }

    async checkWeather() {
        if (this.isWeatherRunning) return;
        this.isWeatherRunning = true;

        while (this.isWeatherRunning) {
            try {
                const weatherRawData = await getWeather1(); // Получаем данные
                console.log(weatherRawData);

                // ✅ Преобразуем данные в `WeatherDto`
                const weatherDto: WeatherDto = {
                    time_point: 0,
                    time_value: new Date().toISOString(), // Текущее время в ISO
                    temp: weatherRawData.temp,
                    humidity: weatherRawData.humidity,
                    pressure: weatherRawData.pressure,
                    wind_speed: weatherRawData.wind_speed,
                    wind_gust: weatherRawData.wind_gust,
                    wind_deg: weatherRawData.wind_deg,
                    clouds: weatherRawData.clouds,
                    rain_1h: weatherRawData.rain_1h,
                    rain_3h: weatherRawData.rain_3h,
                    sunrise: weatherRawData.sunrise,
                    sunset: weatherRawData.sunset,
                    icon: weatherRawData.icon,
                    description: weatherRawData.description,
                    visibility: weatherRawData.visibility,
                    pop: 0, // Вероятность осадков, если отсутствует — 0
                };

                await this.updateWeatherData(weatherDto); // ✅ Обновляем БД
            } catch (error) {
                console.error('❌ Ошибка получения погоды:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 3600000));
        }
    }

    stopWeatherCheck() {
        this.isWeatherRunning = false; // Останавливаем цикл
        console.log('⚠️ Мониторинг погоды остановлен.');
    }

    // ✅ Автоматически запускаем мониторинг при старте NestJS
    onModuleInit() {
        this.checkWeather(); 
    }
}