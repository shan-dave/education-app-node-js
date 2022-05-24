import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import * as handlebars from 'handlebars';

const email = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
}
// const transport = nodemailer.createTransport(email.smtp);

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f684acadd7e251",
    pass: "37809535430d35"
  }
});

const sendEmail = async (to, subject, data) => {
  const filePath = path.join(__dirname, '../configs/email.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    username: data.username,
    password: data.password
  };
  const htmlToSend = template(replacements);
  const msg = { from: email.from, to, subject, html: htmlToSend };
  await transport.sendMail(msg);
};

const sendVerificationEmail = async (to, token) => {
  const subject = 'Encrypted Education Verify Your Account';
  // replace this url with the link to the reset password page of your front-end app
  const verificationUrl = `http://link-to-app/verify-account?token=${token}`;
  const text = `Dear user,
  To your account, click on this link: ${verificationUrl}
  If you did not request, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendResetPasswordEmail = async (to, user, token) => {
  const subject = 'Encrypted Education Password Reset';
  const filePath = path.join(__dirname, '../configs/reset-password.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    url: `http://dokeddatareport.com/#/auth/reset-password?token=${token}`
  };
  const htmlToSend = template(replacements);
  const msg = { from: email.from, to, subject, html: htmlToSend };
  await transport.sendMail(msg);  
};
export default {
  sendVerificationEmail,
  sendEmail,
  sendResetPasswordEmail  
}