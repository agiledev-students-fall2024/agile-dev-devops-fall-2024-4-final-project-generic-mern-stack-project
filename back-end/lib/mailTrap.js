// // this file is used for mailTrap API
// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// const TOKEN = process.env.MAILTRAP_TOKEN;
// const SENDER_EMAIL = process.env.SENDER_EMAIL;
// const SENDER_NAME = process.env.SENDER_NAME;

// const client = new MailtrapClient({ token: TOKEN });

// const sender = { name: SENDER_NAME, email: SENDER_EMAIL };

// export const sendEmail = async ({ subject, text, recipient_email }) => {
//   const recipient = [{ recipient_email }];
//   try {
//     const response = await client.send({
//       from: sender,
//       to: recipient,
//       subject: subject,
//       text: text,
//     });
//     console.log("Email sent successfully!");
//   } catch (error) {
//     throw error;
//   }
// };

// sendEmail({
//   subject: "Reset your password",
//   text: "your code is 1234",
//   recipient_email: "dingyikai03@gmail.com",
// });

// const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: SENDER_EMAIL,
  name: SENDER_NAME,
};
const recipients = [
  {
    email: "yd2255@nyu.edu",
  },
];

client.send({
  from: sender,
  to: recipients,
  subject: "Reset Your Password",
  text: "Your code is 1234",
});
