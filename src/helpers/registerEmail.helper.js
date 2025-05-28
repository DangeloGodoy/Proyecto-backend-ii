import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmailOfRegister = async (email, verifyCode, subject, text) => {
  await transport.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  });
};
