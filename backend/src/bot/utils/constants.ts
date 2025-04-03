export const iconDict = {
    "01d": "☀", "02d": "🌤", "03d": "⛅", "04d": "☁",
    "09d": "⛈", "10d": "⛈", "11d": "⛈", "13d": "🌨", "50d": "🌫",
    "01n": "🌑", "02n": "☁", "03n": "☁", "04n": "☁",
    "09n": "⛈", "10n": "⛈", "11n": "⛈", "13n": "🌨", "50n": "🌫"
};

export function formatTime(date: string | number): string {
    return new Date(date).toLocaleString('ru-RU', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
}

export const generateMessageWeather = (weather: any): string => {
    return `
📅 Время обновления: ${weather.time_value}

🌡 Температура: ${weather.temp}°C
💧 Влажность: ${weather.humidity}%
💨 Облачность: ${weather.clouds}%
🌀 Давление: ${weather.pressure} мм рт. ст.
🌬 Ветер: ${weather.wind_speed} м/с, порывы до ${weather.wind_gust} м/с
🌧 Дождь за последний час: ${weather.rain_1h} мм
🌅 Восход: ${weather.sunrise}
🌇 Закат: ${weather.sunset}
${iconDict[weather.icon] || "📌"} Описание: ${weather.description}

Примечание: информация справочного характера и поступает из открытых источников, фактическое состояние погоды может отличаться`;
};

export const generateMessageUSD = (course: any): string => {
    return `
📅 Время обновления: ${formatTime(course.time)}
  
💰 Курс валют к доллару
за 1 доллар США (USD):
  
🇻🇳 Вьетнамский донг (VND): ${Number(course.vnd).toFixed(0)}
🇷🇺 Российский рубль (RUB): ${Number(course.rub).toFixed(1)}
🇰🇿 Казахский тенге (KZT): ${Number(course.kz).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${Number(course.kirgizstan).toFixed(1)}
🇺🇿 Узбекский сум (UZS): ${Number(course.uzbekistan).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${Number(course.china).toFixed(2)}
🇮🇳 Индийская рупия (INR): ${Number(course.india).toFixed(1)}
🇰🇷 Южнокорейская вона (KRW): ${Number(course.korea).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${Number(course.kambodja).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${Number(course.malaysia).toFixed(2)}
🇬🇧 Фунт стерлингов (GBP): ${Number(course.funt).toFixed(3)}
🇱🇦 Лаосский кип (LAK): ${Number(course.laos).toFixed(0)}
🇹🇷 Турецкая лира (TRY): ${Number(course.lira).toFixed(1)}
🇯🇵 Японская иена (JPY): ${Number(course.japan).toFixed(0)}
🇹🇭 Тайский бат (THB): ${Number(course.tailand).toFixed(1)}
🇪🇺 Евро (EUR): ${Number(course.euro).toFixed(3)}

Примечание: информация справочного характера и поступает из открытых источников, фактический курс валют в обменниках и банках может отличаться как в одну, так и в другую сторону`;
};
  
export const generateMessageVND = (course: any): string => {
    return `
📅 Время обновления: ${formatTime(course.time)}
  
💰 Курс валют к донгу 
за 100,000 (VND):
  
🇺🇸 Доллар США (USD): ${(100000 / Number(course.vnd)).toFixed(2)}
🇷🇺 Российский рубль (RUB): ${(Number(course.rub) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇿 Казахский тенге (KZT): ${(Number(course.kz) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${(Number(course.kirgizstan) / Number(course.vnd) * 100000).toFixed(0)}
🇺🇿 Узбекский сум (UZS): ${(Number(course.uzbekistan) / Number(course.vnd) * 100000).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${(Number(course.china) / Number(course.vnd) * 100000).toFixed(1)}
🇮🇳 Индийская рупия (INR): ${(Number(course.india) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇷 Южнокорейская вона (KRW): ${(Number(course.korea) / Number(course.vnd) * 100000).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${(Number(course.kambodja) / Number(course.vnd) * 100000).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${(Number(course.malaysia) / Number(course.vnd) * 100000).toFixed(1)}
🇬🇧 Фунт стерлингов (GBP): ${(Number(course.funt) / Number(course.vnd) * 100000).toFixed(2)}
🇱🇦 Лаосский кип (LAK): ${(Number(course.laos) / Number(course.vnd) * 100000).toFixed(0)}
🇹🇷 Турецкая лира (TRY): ${(Number(course.lira) / Number(course.vnd) * 100000).toFixed(0)}
🇯🇵 Японская иена (JPY): ${(Number(course.japan) / Number(course.vnd) * 100000).toFixed(0)}
🇹🇭 Тайский бат (THB): ${(Number(course.tailand) / Number(course.vnd) * 100000).toFixed(0)}
🇪🇺 Евро (EUR): ${(Number(course.euro) / Number(course.vnd) * 100000).toFixed(2)}

Примечание: информация справочного характера и поступает из открытых источников, фактический курс валют в обменниках и банках может отличаться как в одну, так и в другую сторону`;
};

export const generateMessageCustomVND = (course: any, amount: number): string => {
    return `
📅 Время обновления: ${formatTime(course.time)}
  
💰 Курс валют к донгу 
за ${amount.toLocaleString()} (VND):
  
🇺🇸 Доллар США (USD): ${(amount / Number(course.vnd)).toFixed(2)}
🇷🇺 Российский рубль (RUB): ${(Number(course.rub) / Number(course.vnd) * amount).toFixed(0)}
🇰🇿 Казахский тенге (KZT): ${(Number(course.kz) / Number(course.vnd) * amount).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${(Number(course.kirgizstan) / Number(course.vnd) * amount).toFixed(0)}
🇺🇿 Узбекский сум (UZS): ${(Number(course.uzbekistan) / Number(course.vnd) * amount).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${(Number(course.china) / Number(course.vnd) * amount).toFixed(1)}
🇮🇳 Индийская рупия (INR): ${(Number(course.india) / Number(course.vnd) * amount).toFixed(0)}
🇰🇷 Южнокорейская вона (KRW): ${(Number(course.korea) / Number(course.vnd) * amount).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${(Number(course.kambodja) / Number(course.vnd) * amount).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${(Number(course.malaysia) / Number(course.vnd) * amount).toFixed(1)}
🇬🇧 Фунт стерлингов (GBP): ${(Number(course.funt) / Number(course.vnd) * amount).toFixed(2)}
🇱🇦 Лаосский кип (LAK): ${(Number(course.laos) / Number(course.vnd) * amount).toFixed(0)}
🇹🇷 Турецкая лира (TRY): ${(Number(course.lira) / Number(course.vnd) * amount).toFixed(0)}
🇯🇵 Японская иена (JPY): ${(Number(course.japan) / Number(course.vnd) * amount).toFixed(0)}
🇹🇭 Тайский бат (THB): ${(Number(course.tailand) / Number(course.vnd) * amount).toFixed(0)}
🇪🇺 Евро (EUR): ${(Number(course.euro) / Number(course.vnd) * amount).toFixed(2)}

Примечание: информация справочного характера и поступает из открытых источников, фактический курс валют в обменниках и банках может отличаться как в одну, так и в другую сторону`;
};

export const generateMessageCustomUSD = (course: any, amount: number): string => {
    return `
📅 Время обновления: ${formatTime(course.time)}
  
💰 Курс валют к доллару 
за ${amount.toLocaleString()} (USD):

🇻🇳 Вьетнамский донг (VND): ${(amount * Number(course.vnd)).toFixed(0)}
🇷🇺 Российский рубль (RUB): ${(amount * Number(course.rub)).toFixed(1)}
🇰🇿 Казахский тенге (KZT): ${(amount * Number(course.kz)).toFixed(0)}
🇰🇬 Киргизский сом (KGS): ${(amount * Number(course.kirgizstan)).toFixed(1)}
🇺🇿 Узбекский сум (UZS): ${(amount * Number(course.uzbekistan)).toFixed(0)}
🇨🇳 Китайский юань (CNY): ${(amount * Number(course.china)).toFixed(2)}
🇮🇳 Индийская рупия (INR): ${(amount * Number(course.india)).toFixed(1)}
🇰🇷 Южнокорейская вона (KRW): ${(amount * Number(course.korea)).toFixed(0)}
🇰🇭 Камбоджийский риель (KHR): ${(amount * Number(course.kambodja)).toFixed(0)}
🇲🇾 Малайзийский ринггит (MYR): ${(amount * Number(course.malaysia)).toFixed(2)}
🇬🇧 Фунт стерлингов (GBP): ${(amount * Number(course.funt)).toFixed(3)}
🇱🇦 Лаосский кип (LAK): ${(amount * Number(course.laos)).toFixed(0)}
🇹🇷 Турецкая лира (TRY): ${(amount * Number(course.lira)).toFixed(1)}
🇯🇵 Японская иена (JPY): ${(amount * Number(course.japan)).toFixed(0)}
🇹🇭 Тайский бат (THB): ${(amount * Number(course.tailand)).toFixed(1)}
🇪🇺 Евро (EUR): ${(amount * Number(course.euro)).toFixed(3)}

Примечание: информация справочного характера и поступает из открытых источников, фактический курс валют в обменниках и банках может отличаться как в одну, так и в другую сторону`;
};
