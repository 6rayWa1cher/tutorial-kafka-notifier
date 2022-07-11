import { Context, MiddlewareFn } from 'telegraf';
import { TelegramBaseException } from '../exception';

const errorMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof TelegramBaseException && err.message != null) {
      await ctx.reply(err.message);
    } else {
      if (!(err instanceof TelegramBaseException)) {
        console.warn(err);
      }
      await ctx.reply('Something went wrong. Please try again');
    }
  }
};

export default errorMiddleware;
