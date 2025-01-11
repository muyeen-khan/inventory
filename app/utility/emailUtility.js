import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_PORT,
  EMAIL_USER,
} from "../config/config.js";

const sendEmail = async (EmailTo, EmailText, EmailSubject, EmailHTMLBody) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `from mern developer <${EMAIL_USER}>`,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
    html: EmailHTMLBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    return false;
  }
};

export default sendEmail;
