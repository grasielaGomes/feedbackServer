export interface FeedbackData {
  type: string;
  message: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackData) => Promise<void>;
}
