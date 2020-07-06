export default async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.status || 500;

    console.error(e);

    ctx.body = {
      message: e.message,
    };
  }
};
