import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
  process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (options) => {
  const email = {
    ...options,
    from: SMTP_FROM,
  };
  return transport.sendMail(email);
};
export default sendEmail;
