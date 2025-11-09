import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import hbs from 'handlebars';
import dotenv from 'dotenv';
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});
export const sendEmail = async ({
  to,
  subject,
  templatePath,
  context = {},
}) => {
  const source = await fs.readFile(templatePath, 'utf-8');
  const template = hbs.compile(source);
  const html = template(context);

  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject,
    html,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      return info;
    })
    .catch((err) => {
      throw err;
    });
};
