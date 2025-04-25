import axios from 'axios';

async function getCourse(moneyToken: string): Promise<any> {
    if (!moneyToken) {
        throw new Error("❌ API-ключ для курса валют отсутствует!");
    }

    const symbolsList = [
        'USD/RUB', 'USD/VND', 'USD/KZT', 'USD/CNY', 'USD/JPY', 'USD/LAK',
        'USD/KHR', 'USD/THB', 'USD/KRW', 'USD/KGS', 'USD/UZS', 'USD/INR',
        'USD/MYR', 'USD/EUR', 'USD/TRY', 'USD/GBP'
    ];

    const symbolChunks = [
        symbolsList.slice(0, 5).join(','),
        symbolsList.slice(5, 10).join(','),
        symbolsList.slice(10).join(',')
    ];

    try {
        const results = [];

        // Функция для задержки
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // Отправляем запросы с задержкой
        for (let i = 0; i < symbolChunks.length; i++) {
            // Отправка запроса
            const response = await axios.get('https://api.twelvedata.com/price', {
                params: {
                    symbol: symbolChunks[i],
                    apikey: moneyToken
                }
            });
            results.push(response.data);

            // Задержка 5 секунд между запросами
            if (i < symbolChunks.length - 1) {
                await delay(5000); // 5000 миллисекунд = 5 секунд
            }
        }

        // Объединяем все результаты
        const data = Object.assign({}, ...results);

        // Приводим к ожидаемой структуре
        return {
            time: new Date().toISOString(),
            rub: Number(data['USD/RUB']?.price),
            vnd: Number(data['USD/VND']?.price),
            china: Number(data['USD/CNY']?.price),
            japan: Number(data['USD/JPY']?.price),
            laos: Number(data['USD/LAK']?.price),
            tailand: Number(data['USD/THB']?.price),
            kambodja: Number(data['USD/KHR']?.price),
            kz: Number(data['USD/KZT']?.price),
            korea: Number(data['USD/KRW']?.price),
            kirgizstan: Number(data['USD/KGS']?.price),
            uzbekistan: Number(data['USD/UZS']?.price),
            india: Number(data['USD/INR']?.price),
            malaysia: Number(data['USD/MYR']?.price),
            euro: Number(data['USD/EUR']?.price),
            lira: Number(data['USD/TRY']?.price),
            funt: Number(data['USD/GBP']?.price),
            usd: 1
        };
    } catch (error: any) {
        console.error("❌ Ошибка получения курса валют:", error.message);
        return null;
    }
}

export default getCourse;
