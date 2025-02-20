import { Update, Start, Hears, InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService
  ) {}
  @Start()
  async onStart(ctx: Context) {
    //ctx.session.counter = ctx.session.counter || 0;
    await ctx.reply(`Привет!`);
  }
}
