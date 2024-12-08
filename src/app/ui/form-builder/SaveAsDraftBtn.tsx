"use client";

import { updateLocalStorage } from "@/utils/localStorage";
import { BtnWithIcon } from "../components/BtnWithIcon";
import { Draft } from "../icons";
import { useFormState } from "./form-state";
import { FORM_BUILDER_STATE_LS_KEY } from "./constants";

export function SaveAsDraftBtn() {
  const areChangesSaved = useFormState((state) => state.areChangesSaved);
  const changesSaved = useFormState((state) => state.changesSaved);
  const questions = useFormState((state) => state.questions);
  const heading = useFormState((state) => state.heading);

  const onClick = () => {
    if (questions === null || heading === null) {
      // precaution
      return;
    }
    updateLocalStorage({ questions, heading }, FORM_BUILDER_STATE_LS_KEY);
    changesSaved();
  };

  return (
    <BtnWithIcon
      icon={<Draft />}
      ariaDisabled={areChangesSaved}
      theme="white"
      type="button"
      pending={false}
      onClick={onClick}
    >
      Save as Draft
    </BtnWithIcon>
  );
}
