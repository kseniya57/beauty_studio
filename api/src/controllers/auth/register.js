import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export default async function (ctx) {
  const {
    password, password_confirmation, email,
  } = ctx.params.data;

  ctx.assert(password === password_confirmation, 'Password confirmation not matched to password');
  delete ctx.params.data.password_confirmation;

  const id = await ctx.table.add({
    email,
    password: await bcrypt.hash(ctx.params.data.password, 10),
  });

  const token = jsonwebtoken.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '1y' },
  );

  ctx.body = {
    user: await this.table.get(id),
    token,
  };
}
