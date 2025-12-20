// app/types/global.d.ts
interface YmParams {
    (counterId: number, action: string, params?: object): void;
  }
  
  interface Window {
    // Яндекс.Метрика
    ym?: YmParams;
    // Массив для отложенных вызовов до загрузки скрипта
    ym?: YmParams & { a?: any[]; l?: number };
  }