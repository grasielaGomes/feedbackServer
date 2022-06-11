import { FeedbackData, FeedbacksRepository } from "../repositories/feedbacks";
import { SendMailAdapter } from "../adapters/mailAdapter";

export class SubmitFeedbackService {
  constructor(
    private feedbackRepository: FeedbacksRepository,
    private sendMailAdapter: SendMailAdapter
  ) {}

  async execute({ message, screenshot, type }: FeedbackData) {
    if (screenshot && !screenshot.startsWith("data:image/png;base64,")) {
      throw new Error("Screenshot must be a base64 encoded png");
    }

    if (!type) {
      throw new Error("Type is required");
    }

    if (!message) {
      throw new Error("Message is required");
    }

    await this.feedbackRepository.create({ message, screenshot, type });
    await this.sendMailAdapter.sendMail({
      subject: "Feedback do usuário",
      body: `
        <p>Tipo: ${type}</p>
        <p>Mensagem: ${message}</p>
        <img src=${screenshot} />
      `
    });
  }
}
