import { SubmitFeedbackService } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const sendMailAdapterSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailAdapterSpy }
);

describe("Submit feedback", () => {
  it("should submit feedback", async () => {
    const feedbackData = {
      message: "This is a test message",
      screenshot: "data:image/png;base64,890easfasfsdfa",
      type: "bug"
    };

    await expect(
      submitFeedbackService.execute(feedbackData)
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith(feedbackData);
    expect(sendMailAdapterSpy).toHaveBeenCalledWith({
      subject: "Feedback do usuário",
      body: `
        <p>Tipo: ${feedbackData.type}</p>
        <p>Mensagem: ${feedbackData.message}</p>
        <img src=${feedbackData.screenshot} />
      `
    });
  });

  it("should not submit feedback when image is not png base64", async () => {
    const feedbackData = {
      message: "This is a test message",
      screenshot: "image.jpg",
      type: "IDEA"
    };

    await expect(submitFeedbackService.execute(feedbackData)).rejects.toThrow();
  });

  it("should not submit feedback when type is undefined or null", async () => {
    const feedbackData = {
      message: "This is a test message",
      screenshot: "data:image/png;base64,890easfasfsdfa",
      type: ""
    };

    await expect(submitFeedbackService.execute(feedbackData)).rejects.toThrow();
  });

  it("should not submit feedback when message is undefined or null", async () => {
    const feedbackData = {
      message: "",
      screenshot: "data:image/png;base64,890easfasfsdfa",
      type: "BUG"
    };

    await expect(submitFeedbackService.execute(feedbackData)).rejects.toThrow();
  });
});
