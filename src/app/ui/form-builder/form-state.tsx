"use client";

import React from "react";
import { createStore, useStore, type StoreApi } from "zustand";
import type { FormState, Question } from "./types";

export const FormBuilderStateContext =
  React.createContext<StoreApi<FormState> | null>(null);

export function FormStateProvider(
  props: Readonly<{
    initialHeading?: string;
    initialQuestions?: Question[];
    children: React.ReactNode;
  }>
) {
  const store = React.useMemo(
    () =>
      createStore<FormState>()((set) => ({
        heading: props.initialHeading ?? "",
        questions: props.initialQuestions ?? [],
        addQuestion: (question: Question) =>
          set(({ questions }) => ({ questions: [...questions, question] })),
        updateQuestion: (id: string, updated: Question) => {
          set((state) => ({
            questions: state.questions.map((question) =>
              question.id === id ? updated : question
            ),
          }));
        },
        deleteQuestion: (id: string) => {
          set((state) => ({
            questions: state.questions.filter((question) => question.id !== id),
          }));
        },
      })),
    // Since the props are named with a prefix of `initial`, there is no need to react to changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
