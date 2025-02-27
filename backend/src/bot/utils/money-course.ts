import axios from 'axios';

async function getCourse(moneyToken: string): Promise<any> { 
    if (!moneyToken) {
        throw new Error("❌ API-ключ для курса валют отсутствует!");
    }

    try {
        const response = await axios.get('http://api.currencylayer.com/live', {
            params: {
                access_key: moneyToken,
                source: 'USD',
                currencies: 'RUB,VND,KZT,CNY,JPY,LAK,KHR,THB,KRW,KGS,UZS,INR,MYR,EUR,TRY,GBP',
                format: 1
            }
        });

        const data = response.data;
        return {
            time: new Date(data.timestamp * 1000).toISOString(),
            rub: data.quotes.USDRUB,
            vnd: data.quotes.USDVND,
            china: data.quotes.USDCNY,
            japan: data.quotes.USDJPY,
            laos: data.quotes.USDLAK,
            tailand: data.quotes.USDTHB,
            kambodja: data.quotes.USDKHR,
            kz: data.quotes.USDKZT,
            korea: data.quotes.USDKRW,
            kirgizstan: data.quotes.USDKGS,
            uzbekistan: data.quotes.USDUZS,
            india: data.quotes.USDINR,
            malaysia: data.quotes.USDMYR,
            euro: data.quotes.USDEUR,
            lira: data.quotes.USDTRY,
            funt: data.quotes.USDGBP,
            usd: 1
        };
    } catch (error) {
        console.error("❌ Ошибка получения курса валют:", error.message);
        return null;
    }
}

export default getCourse;
