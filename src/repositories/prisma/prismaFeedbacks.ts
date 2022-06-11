import { prisma } from "../../prisma";
import { FeedbackData, FeedbacksRepository } from "../feedbacks";

export class PrismaFeedbackRepository implements FeedbacksRepository {
  async create({ message, screenshot, type }: FeedbackData) {
    await prisma.feedback.create({
      data: {
        message,
        screenshot,
        type
      }
    });
  }
}
