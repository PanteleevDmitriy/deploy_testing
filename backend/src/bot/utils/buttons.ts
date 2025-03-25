import { Markup } from 'telegraf';

export const buttons = {
    course: Markup.button.text('💰 Курс валют'),
    weather: Markup.button.text('🌦 Текущая погода'),
    convertToUSD: Markup.button.callback('🇺🇸 Курс доллара США', 'convert_to_usd'),
    convertToVND: Markup.button.callback('🇻🇳 Курс вьетнамского донга', 'convert_to_vnd'),
    enterCustomVND: Markup.button.callback('✏️ Введите сумму в донгах', 'enter_custom_vnd'),
    enterCustomUSD: Markup.button.callback('✏️ Введите сумму в долларах', 'enter_custom_usd'),
};

export const keyboards = {
    start: Markup.keyboard([[buttons.course, buttons.weather]]).resize(),
};

export const inlineKeyboards = {
    usd: Markup.inlineKeyboard([[buttons.convertToVND], [buttons.enterCustomUSD]]),
    vnd: Markup.inlineKeyboard([[buttons.convertToUSD], [buttons.enterCustomVND]]),
};
