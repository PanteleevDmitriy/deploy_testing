import { Update, Start, Hears, InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { BotService } from './bot.service';
import { UsersService } from '../users/users.service'; // ✅ Импортируем UsersService

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: BotService,
    private readonly usersService: UsersService // ✅ Инжектим UsersService
  ) {}

  @Start()
  async onStart(ctx: Context) {
    await ctx.reply(`Привет!`);
  }

  @Hears('юзеры')
  async onUsersRequest(ctx: Context) {
    const users = await this.usersService.getAllUsers(); // ✅ Получаем пользователей
    if (users.length === 0) {
      await ctx.reply('Пользователей нет.');
    } else {
      const userList = users.map(user => `🆔 ${user.id} - 📧 ${user.email}`).join('\n'); // Формируем список
      await ctx.reply(`Список пользователей:\n${userList}`);
    }
  }
}
