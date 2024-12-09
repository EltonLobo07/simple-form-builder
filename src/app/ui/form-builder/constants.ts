export const QUESTION_TYPES_WITH_OPTIONS = ["single-select"] as const;

export const QUESTION_TYPES_WITHOUT_OPTIONS = [
  "short-answer",
  "long-answer",
  "number",
  "url",
] as const;

export const QUESTION_TYPES = [
  ...QUESTION_TYPES_WITHOUT_OPTIONS,
  ...QUESTION_TYPES_WITH_OPTIONS,
] as const;

export const FORM_BUILDER_STATE_LS_KEY = "simple-form-builder-state";
