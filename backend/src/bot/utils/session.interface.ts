import { Context } from 'telegraf';

interface SessionData {
    waitingForVNDInput?: boolean;
}

export interface BotContext extends Context {
    session: SessionData;
}

