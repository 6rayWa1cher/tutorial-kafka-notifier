import { forwardRef, Inject } from '@nestjs/common';
import { Command, Ctx, Help, Message, Start, Update } from 'nestjs-telegraf';
import { Context, deunionize } from 'telegraf';
import { SocialService } from '../social/social.service';
import { TelegramBadRequestException } from './exception/bad-request.exception';

@Update()
export class TelegramUpdate {
  constructor(
    @Inject(forwardRef(() => SocialService))
    private socialService: SocialService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      'Hello! Please, tell me your TelegramToken for further notifications! `/connect TOKEN`',
    );
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply(`/connect TOKEN - connect this chat to the user via token
/disconnect TOKEN - disconnect this chat from the user with the token
    `);
  }

  @Command('connect')
  async connect(@Ctx() ctx: Context) {
    const text = deunionize(ctx.message)?.text.toLowerCase();
    const chatId = ctx.message?.chat.id;

    if (!text || !chatId) throw new Error();

    const token = this.getCommandArgument(text);

    if (!token) {
      throw new TelegramBadRequestException('Expected token to be provided');
    }

    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if (!token.match(regex)) {
      throw new TelegramBadRequestException('Expected token to match UUID');
    }

    const user = await this.socialService.connectTelegramToken(
      chatId.toString(),
      token,
    );
    if (!user) {
      await ctx.reply('User is not found');
    } else {
      await ctx.reply(`Connected to the user "${user.username}"`);
    }
  }

  private getCommandArgument(text: string): string {
    const splitted = text.split(' ');
    return splitted[1];
  }
}
