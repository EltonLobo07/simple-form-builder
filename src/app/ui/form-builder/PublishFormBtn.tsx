"use client";

import React from "react";
import { BtnWithIcon } from "../components/BtnWithIcon";
import { Tick } from "../icons";
import { useIsFormStateValid } from "./useIsFormStateValid";
import { useFormState } from "./form-state";
import { getId } from "@/utils/random";

export function PublishFormBtn() {
  const isValid = useIsFormStateValid();
  const [pending, setPending] = React.useState(false);
  const setNotification = useFormState((state) => state.setNotification);

  const onClick = () => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      const id = getId();
      setNotification({
        type: "info",
        message: "publish feature absent 😞 (check github)",
        srOnly: false,
        id,
      });
      setTimeout(() => {
        setNotification((curNotification) =>
          curNotification?.id === id ? null : curNotification
        );
      }, 3000);
    }, 3000);
  };

  /*
    Ideally, the button should be a submit button
    modifying it because of unfinished work
  */
  return (
    <BtnWithIcon
      ariaDisabled={!isValid}
      icon={<Tick />}
      theme="green"
      type="button"
      onClick={onClick}
      {...(pending
        ? { pending: true, pendingMessage: "publishing form" }
        : { pending: false })}
    >
      Publish form
    </BtnWithIcon>
  );
}
