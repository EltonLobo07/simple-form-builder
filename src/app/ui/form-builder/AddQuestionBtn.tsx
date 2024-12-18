"use client";

import { getId } from "@/utils/random";
import { Plus } from "../icons";
import { useFormState } from "./form-state";
import { motion } from "motion/react";

export function AddQuestionBtn() {
  const addQuestion = useFormState((state) => state.addQuestion);
  const isQuestionsNull = useFormState((state) => state.questions === null);
  const setEnableAutoFocusOnAdd = useFormState(
    (state) => state.setEnableAutoFocusOnAdd
  );

  if (isQuestionsNull) {
    return null;
  }

  return (
    <motion.button
      layout={true}
      type="button"
      onClick={() => {
        setEnableAutoFocusOnAdd(true);
        addQuestion({
          id: getId(),
          title: "",
          helpText: "",
          type: "short-answer",
          options: null,
        });
      }}
      className="mx-auto border border-gray-200 bg-white hover:bg-gray-50 rounded-xl py-[5px] pl-[13px] pr-[15px] text-sm font-semibold text-black flex items-center gap-x-1"
    >
      <Plus />
      <span>Add Question</span>
    </motion.button>
  );
}
