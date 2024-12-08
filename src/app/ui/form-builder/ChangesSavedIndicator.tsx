"use client";

import { classJoin } from "@/utils/tailwind";
import { useFormState } from "./form-state";

export function ChangesSavedIndicator() {
  const areChangesSaved = useFormState((state) => state.areChangesSaved);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={classJoin(
        "w-8px h-8px rounded-full relative",
        areChangesSaved ? "bg-green-500" : "bg-yellow-500"
      )}
    >
      <span className="sr-only">{`changes are ${
        areChangesSaved ? "" : "not "
      }saved`}</span>
    </div>
  );
}
