import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MoneyCourse, Weather } from './bot.model';
import { WeatherDto } from './dto/weather.dto';
import { MoneyCourseDto } from './dto/money-course.dto';

@Injectable()
export class BotService {

    constructor(
        @InjectModel(MoneyCourse) private moneyRepository: typeof MoneyCourse,
        @InjectModel(Weather) private weatherRepository: typeof Weather,
      ) {}

    async updateWeatherData(dto: WeatherDto) {
        return await this.weatherRepository.upsert(dto);
    }

    async updateMoneyCourse(dto: MoneyCourseDto) {
        return await this.moneyRepository.upsert(dto);
    }

    async checkWeather() {
        while (true) {
          try {
            const weatherCurrentValues = await getWeather1();
            console.log(weatherCurrentValues);
        } catch (error) {
            console.error("Не удалось получить погоду:", error.message);
        }
          await new Promise((resolve) => setTimeout(resolve, 3600000)); // Запуск раз в 60 минут
        }
      }

}
