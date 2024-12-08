"use client";

import { classJoin } from "@/utils/tailwind";

type Props = Readonly<{
  noFlexShrink?: boolean;
}>;

export function Error(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={classJoin(
        "w-16px h-16px",
        props.noFlexShrink && "flex-shrink-0"
      )}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-9 3.75h.008v.008H12z"
      ></path>
    </svg>
  );
}
