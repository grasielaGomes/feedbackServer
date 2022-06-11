export interface SendMailData {
  subject: string;
  body: string;
}

export interface SendMailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}