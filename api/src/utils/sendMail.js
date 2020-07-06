import mailer from 'nodemailer';
import { mailConfig } from '../../config';

/* data = { subject, text, html } */
export default async (data) => {
  const transporter = mailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: true, // true for 465, false for other ports
    auth: {
      user: mailConfig.user,
      pass: mailConfig.password,
    },
  });

  await transporter.sendMail({
    from: mailConfig.user,
    to: data.to || mailConfig.to,
    ...data,
  });
};
