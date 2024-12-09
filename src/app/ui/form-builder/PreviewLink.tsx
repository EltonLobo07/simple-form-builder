"use client";

import { classJoin } from "@/utils/tailwind";
import { NewTab } from "../icons";
import { useIsFormStateValid } from "./useIsFormStateValid";

export function PreviewLink() {
  const isValid = useIsFormStateValid();

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
        isValid ? "text-black hover:bg-gray-50" : "text-gray-400"
      )}
    >
      <span>Preview</span>
      <NewTab />
    </a>
  );
}
