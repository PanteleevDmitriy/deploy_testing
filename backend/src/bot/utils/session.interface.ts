import { Context } from 'telegraf';

interface SessionData {
    waitingForVNDInput?: boolean;
    waitingForUSDInput?: boolean;
}

export interface BotContext extends Context {
    session: SessionData;
}

