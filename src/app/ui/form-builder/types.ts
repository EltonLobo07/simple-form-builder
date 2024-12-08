import type { AtLeastTwo } from "@/utils/types";
import { QUESTION_TYPES } from "./constants";
import * as v from "valibot";
import {
  OptionsSchema,
  QuestionSchema,
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
  type: "critical" | "warning";
  message: string;
};

export type FormState = {
  heading: string;
  questions: Question[] | null;
  notification: Notification | null;
  areChangesSaved: boolean;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updated: Question) => void;
  deleteQuestion: (id: string) => void;
  setNotification: (notification: Notification) => void;
  changesSaved: () => void;
};
