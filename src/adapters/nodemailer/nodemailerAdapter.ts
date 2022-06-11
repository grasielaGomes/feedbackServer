import { SendMailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "66c433cdcae8c9",
    pass: "88ff8b796fd3b0"
  }
});
export class NodemailerAdapter implements SendMailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedBack <oi@feedback.com>",
      to: "Grasiela Gomes <produtoradama@gmail.com>",
      subject,
      html: body
    });
  }
}
