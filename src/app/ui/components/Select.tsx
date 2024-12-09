"use client";

import * as RPSelect from "@radix-ui/react-select";
import React from "react";
import { ChevronDown, Tick } from "../icons";
import { ReadonlyAtLeastOne } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";

type Props<T extends string> = Readonly<{
  options: ReadonlyAtLeastOne<T>;
  optionToDisplayDetails: Record<
    T,
    Readonly<{ displayText: string; icon: () => React.ReactNode }>
  >;
  srOnlyLabel: string;
  groupLabel: string;
  selected: T;
  onChange: (value: T) => void;
}>;

// todo: improve render performance using composition, Example: <InternalSelect>{optionsJSX}</IternalSelect>
export function Select<T extends string>(props: Props<T>) {
  // todo: remove the type assertion
  const SelectedIcon = props.optionToDisplayDetails[props.selected]
    .icon as () => React.ReactNode;
  const [open, setOpen] = React.useState({ radix: false, motion: false });

  return (
    <RPSelect.Root
      value={props.selected}
      onValueChange={props.onChange}
      open={open.radix || open.motion}
      onOpenChange={(open) => setOpen({ radix: open, motion: true })}
    >
      <RPSelect.Trigger
        className="relative flex items-center text-gray-400 hover:text-black"
        aria-label={props.srOnlyLabel}
      >
        <RPSelect.Value asChild={true}>
          <span>
            <span className="sr-only">{props.selected}</span>
            <SelectedIcon />
          </span>
        </RPSelect.Value>
        <RPSelect.Icon asChild={true}>
          <ChevronDown />
        </RPSelect.Icon>
      </RPSelect.Trigger>

      <RPSelect.Portal>
        <AnimatePresence
          onExitComplete={() => setOpen({ radix: false, motion: false })}
        >
          {open.radix && (
            <RPSelect.Content
              position="popper"
              side="bottom"
              align="end"
              asChild
            >
              <motion.div
                key="rp-select-content-child"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-md min-w-[200px] tabAndUp:min-w-[300px]"
              >
                <RPSelect.Viewport className="p-[4px]">
                  <RPSelect.Group>
                    <RPSelect.Label className="bg-gray-50 text-gray-500 rounded-lg px-16px py-[0.625rem] text-xs font-semibold tracking-[0.04em]">
                      {props.groupLabel}
                    </RPSelect.Label>
                    {props.options.map((option) => {
                      const displayDetails =
                        props.optionToDisplayDetails[option];
                      // todo: remove the type assertion
                      const Icon = displayDetails.icon as () => React.ReactNode;
                      return (
                        <RPSelect.Item
                          key={option}
                          value={option}
                          className="flex items-center gap-x-8px py-2 px-8px text-sm font-medium cursor-default hover:bg-gray-100 rounded-lg"
                        >
                          <Icon />
                          <RPSelect.ItemText>
                            {displayDetails.displayText}
                          </RPSelect.ItemText>
                          <RPSelect.ItemIndicator className="ml-auto">
                            <Tick />
                          </RPSelect.ItemIndicator>
                        </RPSelect.Item>
                      );
                    })}
                  </RPSelect.Group>
                </RPSelect.Viewport>
              </motion.div>
            </RPSelect.Content>
          )}
        </AnimatePresence>
      </RPSelect.Portal>
    </RPSelect.Root>
  );
}
