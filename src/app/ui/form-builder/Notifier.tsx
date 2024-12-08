"use client";

import { classJoin } from "@/utils/tailwind";
import { useFormState } from "./form-state";
import { Bell, Error } from "../icons";
import { Notification } from "./types";

const TYPE_TO_ICON: Record<Notification["type"], () => React.ReactNode> = {
  critical: Error,
  warning: Bell,
};

export function Notifier() {
  const notification = useFormState((state) => state.notification);
  const Icon = TYPE_TO_ICON[notification?.type ?? "warning"];

  return (
    <div
      aria-live="polite"
      aria-atomic={true}
      className={classJoin(
        "min-h-6 text-xs font-medium flex justify-center items-center gap-x-1",
        notification?.type === "critical" ? "text-red-500" : "text-yellow-500"
      )}
    >
      {notification?.message && (
        <>
          <Icon />
          <span>{notification.message}</span>
        </>
      )}
    </div>
  );
}
