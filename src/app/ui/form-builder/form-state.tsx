"use client";

import React from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { FormState, Notification, Question } from "./types";
import { fromLocalStorage } from "@/utils/localStorage";
import { FORM_BUILDER_STATE_LS_KEY } from "./constants";
import * as v from "valibot";
import { QuestionsSchema } from "./schemas";

export const FormBuilderStateContext =
  React.createContext<StoreApi<FormState> | null>(null);

export function FormStateProvider(
  props: Readonly<{
    initialHeading?: string;
    initialQuestions?: Question[];
    initialNotification?: Notification | null;
    children: React.ReactNode;
  }>
) {
  const store = React.useMemo(
    () =>
      createStore<FormState>()((set, get) => ({
        heading: "",
        questions: null,
        notification: {
          type: "warning",
          message: "Loading form data",
        },
        areChangesSaved: true,
        // todo: create a middleware to get rid of the repitition -
        // 1. setting `areChangesSaved`
        // 2. setting `questions`
        addQuestion: (question: Question) => {
          const questions = get().questions;
          if (questions === null) {
            return;
          }
          set(() => ({
            questions: [...questions, question],
            areChangesSaved: false,
          }));
        },
        updateQuestion: (id: string, updated: Question) => {
          const questions = get().questions;
          if (questions === null) {
            return;
          }
          set((state) => ({
            questions: questions.map((question) =>
              question.id === id ? updated : question
            ),
            areChangesSaved: false,
          }));
        },
        deleteQuestion: (id: string) => {
          const questions = get().questions;
          if (questions === null) {
            return;
          }
          set(() => ({
            questions: questions.filter((question) => question.id !== id),
            areChangesSaved: false,
          }));
        },
        setNotification: (notification: Notification) => {
          set(() => ({
            notification,
          }));
        },
        changesSaved: () => {
          set(() => ({ areChangesSaved: true }));
        },
      })),
    // Since the props are named with a prefix of `initial`, there is no need to react to changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    const questions = fromLocalStorage({
      defaultValue: [],
      isValue: (possibleValue) => v.is(QuestionsSchema, possibleValue),
      key: FORM_BUILDER_STATE_LS_KEY,
    });
    store.setState({ questions, notification: null });
  }, [store]);

  return (
    <FormBuilderStateContext.Provider value={store}>
      {props.children}
    </FormBuilderStateContext.Provider>
  );
}

export function useFormStore() {
  const formBuilderStore = React.useContext(FormBuilderStateContext);
  if (formBuilderStore === null) {
    throw new Error("`useFormStore` must be used within a `FormStateProvider`");
  }
  return formBuilderStore;
}

export function useFormState<T>(selector: (state: FormState) => T) {
  return useStore(useFormStore(), selector);
}
