import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MoneyCourse, Weather } from './bot.model';
import { WeatherDto } from './dto/weather.dto';
import { getWeather1 } from './utils/weather';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService implements OnModuleInit {
    private isWeatherRunning = false;
    private weatherToken: string;

    constructor(
        @InjectModel(MoneyCourse) private moneyRepository: typeof MoneyCourse,
        @InjectModel(Weather) private weatherRepository: typeof Weather,
        private configService: ConfigService
    ) {
        this.weatherToken = this.configService.get<string>('WEATHER_TOKEN');
        if (!this.weatherToken) {
            console.error('❌ Ошибка: WEATHER_TOKEN отсутствует в конфигурации!');
        }
    }

    async updateWeatherData(dto: WeatherDto) {
        return await this.weatherRepository.upsert(dto);
    }

    async checkWeather() {
        if (this.isWeatherRunning) return;
        this.isWeatherRunning = true;

        while (this.isWeatherRunning) {
            try {
                if (!this.weatherToken) {
                    throw new Error('❌ Ошибка: WEATHER_TOKEN не задан!');
                }

                const weatherRawData = await getWeather1(this.weatherToken);
                if (!weatherRawData) {
                    throw new Error('❌ Ошибка: Данные о погоде не получены!');
                }

                const weatherDto: WeatherDto = {
                    time_point: 0,
                    time_value: new Date().toISOString(),
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
                    pop: 0,
                };

                await this.updateWeatherData(weatherDto);
            } catch (error) {
                console.error('❌ Ошибка получения погоды:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 3600000));
        }
    }

    stopWeatherCheck() {
        this.isWeatherRunning = false;
        console.log('⚠️ Мониторинг погоды остановлен.');
    }

    onModuleInit() {
        this.checkWeather(); 
    }
}
