import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function (ctx) {
  const { email, password } = ctx.params;

  const user = await this.table.get({ email });

  if (!user) {
    throw new Error('User with the given email not exist');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Incorrect password');
  }

  const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  ctx.body = {
    token,
    user,
  };
}
