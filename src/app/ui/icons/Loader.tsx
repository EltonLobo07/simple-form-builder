"use client";

import { classJoin } from "@/utils/tailwind";

type Props = Readonly<{
  className?: string;
}>;

export function Loader(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      //   width="24"
      //   height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={classJoin("w-16px h-16px", props.className)}
      viewBox="0 0 24 24"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  );
}
