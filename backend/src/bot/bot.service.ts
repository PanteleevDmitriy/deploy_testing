import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
                    time_value: this.formatTime(Date.now()),
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
                if (!this.moneyToken) {
                    throw new Error("❌ API-ключ для валют отсутствует!");
                }

                let courseData = await getCourse(this.moneyToken);
                if (!courseData) {
                    throw new Error("❌ Неверные данные по курсам валют!");
                }
                
                await this.moneyRepository.upsert({ ...courseData, time: this.formatTime(Date.now()) });
            } catch (error) {
                console.error('❌ Ошибка получения курса валют:', error.message);
            }
            await new Promise(resolve => setTimeout(resolve, 3600000));
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

    onModuleInit() {
        this.checkWeather();
        this.updateMoneyCourse();
    }
}