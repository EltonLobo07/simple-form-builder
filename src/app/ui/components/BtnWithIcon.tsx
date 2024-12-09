"use client";

import { classJoin } from "@/utils/tailwind";
import React from "react";
import { Loader } from "../icons";

type Props = Readonly<
  {
    ariaDisabled?: boolean;
    icon: React.ReactNode;
    children: string;
    type: "submit" | "button";
    theme: "white" | "green";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & (
    | { pending: true; pendingMessage: string }
    | { pending?: false; pendingMessage?: undefined }
  )
>;

export function BtnWithIcon(props: Props) {
  const disabled = (props.pending || props.ariaDisabled) ?? false;
  const iconJSX = props.pending ? (
    <Loader className="animate-spin" />
  ) : (
    props.icon
  );

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  return (
    <button
      type={props.type}
      aria-disabled={disabled}
      className={classJoin(
        "pl-[13px] pr-[15px] relative rounded-xl py-[0.3125rem] text-sm font-semibold flex items-center gap-x-1 border",
        props.theme === "green"
          ? classJoin(
              "border text-white",
              disabled
                ? "opacity-50 bg-green-400 border-green-400"
                : "bg-green-500 hover:bg-green-600 border-green-500"
            )
          : disabled
          ? "text-gray-400 bg-white"
          : "text-black bg-white hover:bg-gray-50 border-gray-200"
      )}
      onClick={onClick}
    >
      {iconJSX}
      <span className="sr-only" aria-live="assertive" aria-atomic={true}>
        {props.pendingMessage}
      </span>
      <span aria-hidden={props.pending}>{props.children}</span>
    </button>
  );
}
