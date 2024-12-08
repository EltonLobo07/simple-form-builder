"use client";

import Link from "next/link";
import { NewTab } from "../icons";

export function PreviewLink() {
  return (
    <Link
      href="/"
      prefetch={false}
      target="_blank"
      className="border border-gray-200 flex items-center gap-x-1 rounded-xl py-[5px] pl-[15px] pr-[13px] text-sm text-gray-400 hover:text-black font-semibold"
    >
      <span>Preview</span>
      <NewTab />
    </Link>
  );
}
