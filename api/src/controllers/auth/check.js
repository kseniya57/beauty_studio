import jwt from 'jsonwebtoken';

export default async function (ctx) {
  const token = ctx.header.authorization;

  const userData = await jwt.verify(token, process.env.JWT_SECRET);

  ctx.body = {
    token,
    user: userData && userData.id && await this.table.get(userData.id),
  };
}
