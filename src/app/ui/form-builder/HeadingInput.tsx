"use client";

import React from "react";

export function HeadingInput() {
  const inputId = React.useId();

  return (
    <div className="relative flex">
      <label htmlFor={inputId} className="sr-only">
        form heading
      </label>
      <input
        type="text"
        id={inputId}
        defaultValue=""
        name="form-heading"
        placeholder="Untitled form"
        className="basis-0 grow px-[4px] font-semibold placeholder:text-gray-400 text-black text-base leading-[1.375]"
      />
    </div>
  );
}
