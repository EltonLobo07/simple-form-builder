import * as v from "valibot";
import {
  HeadingSchema,
  OptionsSchema,
  QuestionSchema,
  QuestionsSchema,
  QuestionTypesSchema,
  QuestionWithOptionsSchema,
  QuestionWithoutOptionsSchema,
} from "./schemas";

export type QuestionType = v.InferOutput<typeof QuestionTypesSchema>;

export type Options = v.InferOutput<typeof OptionsSchema>;

export type QuestionWithOptions = v.InferOutput<
  typeof QuestionWithOptionsSchema
>;

export type QuestionWithoutOptions = v.InferOutput<
  typeof QuestionWithoutOptionsSchema
>;

export type Question = v.InferOutput<typeof QuestionSchema>;

export type Notification = {
  type: "critical" | "info";
  message: string;
  srOnly?: boolean;
  id: string | null;
};

export type FormState = {
  heading: v.InferOutput<typeof HeadingSchema> | null;
  questions: v.InferOutput<typeof QuestionsSchema> | null;
  notification: Notification | null;
  areChangesSaved: boolean;
  enableAutoFocusOnAdd: boolean;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updated: Question) => void;
  deleteQuestion: (id: string) => void;
  setNotification: (notification: Notification) => void;
  changesSaved: () => void;
  setHeading: (heading: string) => void;
  setEnableAutoFocusOnAdd: (enableAutoFocusOnAdd: boolean) => void;
};
