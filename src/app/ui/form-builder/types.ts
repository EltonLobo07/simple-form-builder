import type { AtLeastTwo } from "@/utils/types";
import { QUESTION_TYPES } from "./constants";

export type QuestionType = (typeof QUESTION_TYPES)[number];

export type Options = AtLeastTwo<{ id: string; value: string }>;

type QuestionCommonProps = {
  id: string;
  title: string;
  helpText?: string | null;
};

export type QuestionWithOptions = QuestionCommonProps & {
  type: "single-select";
  options: Options;
};

export type QuestionWithoutOptions = QuestionCommonProps & {
  type: Exclude<QuestionType, "single-select">;
  options?: undefined;
};

export type Question = QuestionWithOptions | QuestionWithoutOptions;

export type FormState = {
  heading: string;
  questions: Question[];
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updated: Question) => void;
  deleteQuestion: (id: string) => void;
};
