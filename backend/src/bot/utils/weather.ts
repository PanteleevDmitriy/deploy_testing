import axios from 'axios';
import moment from 'moment';

const lat = 12.24197;
const lon = 109.19487;

async function getWeather1(weatherToken) {
    if (!weatherToken) {
        throw new Error("❌ API-ключ для погоды отсутствует!");
    }

    console.log("📡 Отправка запроса в OpenWeather API...");

    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat,
                lon,
                appid: weatherToken,
                units: 'metric',
                lang: 'ru'
            }
        });

        const data = response.data;
        console.log("✅ Данные получены:", JSON.stringify(data, null, 2));

        // Проверка наличия ключей
        if (!data.dt || !data.sys?.sunrise || !data.sys?.sunset) {
            throw new Error("❌ Неверные данные о погоде! (dt, sunrise или sunset отсутствуют)");
        }

        return {
            time: moment.unix(Number(data.dt)).utcOffset(7).format('YYYY-MM-DD HH:mm:ss'),
            temp: parseFloat(data.main.temp.toFixed(1)),
            humidity: data.main.humidity,
            pressure: parseFloat((data.main.pressure / 1.3333333).toFixed(1)),
            wind_speed: parseFloat(data.wind.speed.toFixed(1)),
            wind_gust: data.wind.gust ? parseFloat(data.wind.gust.toFixed(1)) : 0,
            wind_deg: data.wind.deg,
            clouds: data.clouds.all,
            visibility: data.visibility || 0,
            rain_1h: data.rain?.['1h'] || 0,
            rain_3h: data.rain?.['3h'] || 0,
            icon: data.weather[0]?.icon || 'unknown',
            description: data.weather[0]?.description || 'Нет данных',
            sunrise: moment.unix(Number(data.sys.sunrise)).utcOffset(7).format('YYYY-MM-DD HH:mm:ss'),
            sunset: moment.unix(Number(data.sys.sunset)).utcOffset(7).format('YYYY-MM-DD HH:mm:ss'),
        };
    } catch (error) {
        console.error("❌ Ошибка получения данных о погоде:", error.message);
        return null;
    }
}

export { getWeather1 };
