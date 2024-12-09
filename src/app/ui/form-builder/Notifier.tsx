"use client";

import { classJoin } from "@/utils/tailwind";
import { useFormState } from "./form-state";
import { Bell, Error } from "../icons";
import { Notification } from "./types";

const TYPE_TO_ICON: Record<
  Notification["type"],
  (props: Readonly<{ noFlexShrink?: boolean }>) => React.ReactNode
> = {
  critical: Error,
  info: Bell,
};

export function Notifier() {
  const notification = useFormState((state) => state.notification);
  const Icon = TYPE_TO_ICON[notification?.type ?? "info"];

  return (
    <div
      aria-live="polite"
      aria-atomic={true}
      className={classJoin(
        "relative min-h-6 text-xs font-medium flex items-center gap-x-1 px-8px tabAndUp:px-24px",
        notification?.type === "critical" ? "text-red-500" : "text-yellow-500"
      )}
    >
      {notification?.message && (
        <span
          className={classJoin(
            "flex items-center gap-x-1",
            notification?.srOnly && "sr-only"
          )}
        >
          <Icon noFlexShrink={true} />
          <span className="grow ">{notification.message}</span>
        </span>
      )}
    </div>
  );
}
