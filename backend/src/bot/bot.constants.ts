export const iconDict = {
    "01d": "☀", "02d": "🌤", "03d": "⛅", "04d": "☁",
    "09d": "⛈", "10d": "⛈", "11d": "⛈", "13d": "🌨", "50d": "🌫",
    "01n": "🌑", "02n": "☁", "03n": "☁", "04n": "☁",
    "09n": "⛈", "10n": "⛈", "11n": "⛈", "13n": "🌨", "50n": "🌫"
};

export const generateMessageWeather = (weather: any): string => {
    return `
📅 Последнее обновление: ${weather.time_value}

🌡 Температура: ${weather.temp}°C
💧 Влажность: ${weather.humidity}%
💨 Облачность: ${weather.clouds}%
🌀 Давление: ${weather.pressure} мм рт. ст.
🌬 Ветер: ${weather.wind_speed} м/с, порывы до ${weather.wind_gust} м/с
🌧 Дождь за последний час: ${weather.rain_1h} мм
🌧 Дождь за последние 3 часа: ${weather.rain_3h} мм
🌅 Восход: ${weather.sunrise}
🌇 Закат: ${weather.sunset}
🌫 Видимость: ${weather.visibility} м
${iconDict[weather.icon] || "📌"} Описание: ${weather.description}`;
};

export const generateMessageUSD = (course: any): string => {
    return `
📅 Последнее обновление: ${course.time}
  
💰 Курс валют за 1 доллар США (USD):
  
🇻🇳 Вьетнамский донг (VND): ${Number(course.vnd).toFixed(0)}
🇷🇺 Российский рубль (RUB): ${Number(course.rub).toFixed(1)}
🇰🇿 Казахский тенге (KZT): ${Number(course.kz).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${Number(course.kirgizstan).toFixed(1)}
🇺🇿 Узбекский сум (UZS): ${Number(course.uzbekistan).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${Number(course.china).toFixed(2)}
🇯🇵 Японская иена (JPY): ${Number(course.japan).toFixed(0)}
🇹🇭 Тайский бат (THB): ${Number(course.tailand).toFixed(1)}
🇱🇦 Лаосский кип (LAK): ${Number(course.laos).toFixed(0)}
🇮🇳 Индийская рупия (INR): ${Number(course.india).toFixed(1)}
🇰🇷 Южнокорейская вона (KRW): ${Number(course.korea).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${Number(course.kambodja).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${Number(course.malaysia).toFixed(2)}
🇬🇧 Фунт стерлингов (GBP): ${Number(course.funt).toFixed(3)}
🇹🇷 Турецкая лира (TRY): ${Number(course.lira).toFixed(1)}
🇪🇺 Евро (EUR): ${Number(course.euro).toFixed(3)}`;
};
  
export const generateMessageVND = (course: any): string => {
    return `
📅 Последнее обновление: ${course.time}
  
💰 Курс валют за 100.000 донгов (VND):
  
🇺🇸 Доллар США (USD): ${(100000 / Number(course.vnd)).toFixed(2)}
🇷🇺 Российский рубль (RUB): ${(Number(course.rub) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇿 Казахский тенге (KZT): ${(Number(course.kz) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${(Number(course.kirgizstan) / Number(course.vnd) * 100000).toFixed(0)}
🇺🇿 Узбекский сум (UZS): ${(Number(course.uzbekistan) / Number(course.vnd) * 100000).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${(Number(course.china) / Number(course.vnd) * 100000).toFixed(1)}
🇯🇵 Японская иена (JPY): ${(Number(course.japan) / Number(course.vnd) * 100000).toFixed(0)}
🇹🇭 Тайский бат (THB): ${(Number(course.tailand) / Number(course.vnd) * 100000).toFixed(0)}
🇱🇦 Лаосский кип (LAK): ${(Number(course.laos) / Number(course.vnd) * 100000).toFixed(0)}
🇮🇳 Индийская рупия (INR): ${(Number(course.india) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇷 Южнокорейская вона (KRW): ${(Number(course.korea) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${(Number(course.kambodja) / Number(course.vnd) * 100000).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${(Number(course.malaysia) / Number(course.vnd) * 100000).toFixed(1)}
🇬🇧 Фунт стерлингов (GBP): ${(Number(course.funt) / Number(course.vnd) * 100000).toFixed(2)}
🇹🇷 Турецкая лира (TRY): ${(Number(course.lira) / Number(course.vnd) * 100000).toFixed(0)}
🇪🇺 Евро (EUR): ${(Number(course.euro) / Number(course.vnd) * 100000).toFixed(2)}`;
};
  