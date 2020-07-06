export default async (ctx, next) => {
  ctx.params = {
    ...ctx.query,
    ...ctx.request.body,
  };

  await next();
};
