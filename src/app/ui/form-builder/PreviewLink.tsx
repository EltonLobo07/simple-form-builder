"use client";

import { classJoin } from "@/utils/tailwind";
import { NewTab } from "../icons";
import { useFormState } from "./form-state";
import { isFormBuilderStateValid } from "./helpers";

export function PreviewLink() {
  const heading = useFormState((state) => state.heading);
  const questions = useFormState((state) => state.questions);
  const areChangesSaved = useFormState((state) => state.areChangesSaved);

  const isValid = isFormBuilderStateValid({
    heading,
    questions,
    areChangesSaved,
  });

  /*
    `Link` from NextJS is purposely not used here as
    this component does not need any of its features
  */
  return (
    <a
      aria-disabled={!isValid}
      href="/"
      target="_blank"
      onClick={(e) => {
        if (!isValid) {
          e.preventDefault();
        }
      }}
      className={classJoin(
        "border border-gray-200 flex items-center gap-x-1 rounded-xl py-[0.3125rem] pl-[15px] pr-[13px] text-sm font-semibold",
        isValid ? "text-black hover:bg-gray-100" : "text-gray-400"
      )}
    >
      <span>Preview</span>
      <NewTab />
    </a>
  );
}
