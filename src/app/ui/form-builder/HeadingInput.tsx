"use client";

import React from "react";
import { useFormState } from "./form-state";
import { classJoin } from "@/utils/tailwind";

export function HeadingInput() {
  const heading = useFormState((state) => state.heading);
  const setHeading = useFormState((state) => state.setHeading);
  const inputId = React.useId();

  const isHeadingNull = heading === null;

  return (
    <div className="relative flex">
      <label htmlFor={inputId} className="sr-only">
        form heading
      </label>
      <input
        inert={isHeadingNull}
        type="text"
        id={inputId}
        value={heading ?? ""}
        name="form-heading"
        onChange={(e) => setHeading(e.target.value)}
        placeholder="Untitled form"
        className={classJoin(
          "basis-0 grow px-[4px] font-semibold text-black text-base leading-[1.375]",
          isHeadingNull
            ? "bg-gray-200 animate-pulse placeholder:text-gray-200"
            : "placeholder:text-gray-400"
        )}
      />
    </div>
  );
}
