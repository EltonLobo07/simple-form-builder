"use client";

import { getId } from "@/utils/random";
import { Plus } from "../icons";
import { useFormState } from "./form-state";

export function AddQuestionBtn() {
  const addQuestion = useFormState((state) => state.addQuestion);
  const isQuestionsNull = useFormState((state) => state.questions === null);

  if (isQuestionsNull) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        addQuestion({
          id: getId(),
          title: "",
          helpText: "",
          type: "short-answer",
          options: null,
        })
      }
      className="mx-auto border border-gray-200 bg-white rounded-xl py-[5px] pl-[13px] pr-[15px] text-sm font-semibold text-black flex items-center gap-x-1"
    >
      <Plus />
      <span>Add question</span>
    </button>
  );
}
