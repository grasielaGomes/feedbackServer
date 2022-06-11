import express from "express";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbacks";
import { SubmitFeedbackService } from "./services/submitFeedback";
import { NodemailerAdapter } from "./adapters/nodemailer/nodemailerAdapter";

export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
  const { message, screenshot, type } = req.body;

  try {
    const feedbackRepository = new PrismaFeedbackRepository();
    const nodemailerAdapter = new NodemailerAdapter();
    const submitFeedbackService = new SubmitFeedbackService(
      feedbackRepository,
      nodemailerAdapter
    );

    await submitFeedbackService.execute({ message, screenshot, type });
    res.status(201).send();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
