import { getId } from "@/utils/random";
import { FormState } from "./types";

export function newOption() {
  return {
    id: getId(),
    value: "",
  };
}

export function isFormBuilderStateValid({
  heading,
  questions,
  areChangesSaved,
}: Pick<FormState, "heading" | "questions" | "areChangesSaved">) {
  if (
    !heading ||
    !areChangesSaved ||
    questions === null ||
    questions.length === 0
  ) {
    return false;
  }
  for (const question of questions) {
    if (
      !question.title ||
      (question.type === "single-select" &&
        question.options.some(({ value }) => value === ""))
    ) {
      return false;
    }
  }
  return true;
}
