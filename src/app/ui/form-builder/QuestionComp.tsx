"use client";

import React from "react";
import type {
  Question,
  QuestionType,
  QuestionWithOptions,
  QuestionWithoutOptions,
} from "./types";
import {
  Circle,
  Delete,
  Handle,
  LongAnswer,
  Number,
  Plus,
  ShortAnswer,
  SingleSelect,
  Url,
} from "../icons";
import { Select } from "../components/Select";
import { QUESTION_TYPES } from "./constants";
import { exhaustiveCheck } from "@/utils/code-flow";
import { newOption } from "./helpers";

type Props = Readonly<{
  question: Question;
  onChange: (id: string, updated: Question) => void;
  onDelete: (id: string) => void;
}>;

function getInputId(name: string, id: string) {
  return `${name}-${id}`;
}

const typeToDisplayDetails: Record<
  QuestionType,
  Readonly<{ displayText: string; icon: () => React.ReactNode }>
> = {
  "short-answer": { displayText: "Short answer", icon: ShortAnswer },
  "long-answer": { displayText: "Long answer", icon: LongAnswer },
  "single-select": { displayText: "Single select", icon: SingleSelect },
  number: { displayText: "Number", icon: Number },
  url: { displayText: "Url", icon: Url },
};

export function QuestionComp({ question, onChange, onDelete }: Props) {
  const id = React.useId();
  const titleInputId = getInputId("title", id);
  const helpTextInputId = getInputId("helpText", id);

  const onTypeChange = React.useCallback(
    (newType: QuestionType) => {
      const newQuestion: Question = { ...question };
      if (newType === "single-select") {
        newQuestion.type = "single-select";
        newQuestion.options = [newOption(), newOption()];
      } else {
        newQuestion.type = newType;
        newQuestion.options = null;
      }
      onChange(question.id, newQuestion);
    },
    [onChange, question]
  );

  const addNewOption = React.useCallback(
    (question: QuestionWithOptions) => {
      onChange(question.id, {
        ...question,
        options: [...question.options, newOption()],
      });
    },
    [onChange]
  );

  const deleteOption = React.useCallback(
    (question: QuestionWithOptions, optionId: string) => {
      const newOptions = question.options.filter(
        (option) => option.id !== optionId
      );
      if (newOptions.length < 2) {
        console.error("SingleSelectQuestion must have at least 2 options");
        return;
      }
      onChange(question.id, {
        ...question,
        // todo: remove the type assertion (create a type narrowing or type assertion helper function)
        options: newOptions as unknown as QuestionWithOptions["options"],
      });
    },
    [onChange]
  );

  return (
    <div className="border border-gray-200 relative bg-white rounded-2xl p-4">
      <div className="flex items-center gap-x-2 mb-2">
        <div className="grow flex flex-col gap-y-1">
          <label htmlFor={titleInputId} className="sr-only">
            title
          </label>
          <input
            type="text"
            id={titleInputId}
            name="title"
            defaultValue={question.title}
            placeholder="Write a question"
            className="font-semibold text-sm placeholder:text-gray-400 text-black"
          />
          <label htmlFor={helpTextInputId} className="sr-only">
            help text
          </label>
          <input
            type="text"
            id={helpTextInputId}
            name="helpText"
            defaultValue={question.helpText ?? ""}
            placeholder="Write a help text or caption (leave empty if not needed)."
            className="text-xs placholder:text-gray-400 text-black"
          />
        </div>
        <div className="flex items-center gap-x-8px">
          <Select
            selected={question.type}
            onChange={onTypeChange}
            options={QUESTION_TYPES}
            optionToDisplayDetails={typeToDisplayDetails}
            srOnlyLabel="question type"
            groupLabel="INPUT TYPES"
          />
          {/*todo: use this button for the 'drag and drop' feature*/}
          <button type="button" className="relative">
            <span className="sr-only">reorder question</span>
            <Handle />
          </button>
          <button
            type="button"
            onClick={() => onDelete(question.id)}
            className="relative"
          >
            <span className="sr-only">delete this question</span>
            <Delete />
          </button>
        </div>
      </div>
      <div className="relative flex">
        {question.type !== "single-select" ? (
          <WithoutOptionsAnswerArea question={question} />
        ) : (
          <WithOptionsAnswerArea
            question={question}
            addNewOption={addNewOption}
            deleteOption={deleteOption}
          />
        )}
      </div>
    </div>
  );
}

type WithoutOptionsAnswerAreaProps = Readonly<{
  question: QuestionWithoutOptions;
}>;

function WithoutOptionsAnswerArea({ question }: WithoutOptionsAnswerAreaProps) {
  const id = React.useId();

  const { type } = question;
  let inputPreviewJSX: React.ReactNode = null;
  switch (type) {
    case "short-answer":
      inputPreviewJSX = (
        <input
          id={id}
          readOnly={true}
          type="text"
          className="border border-gray-200 rounded-lg bg-gray-100 grow"
        />
      );
      break;
    case "long-answer":
      inputPreviewJSX = (
        <textarea
          id={id}
          readOnly={true}
          className="border border-gray-200 rounded-lg bg-gray-100 grow min-h-[80px]"
        ></textarea>
      );
      break;
    case "number":
      inputPreviewJSX = (
        <input
          id={id}
          readOnly={true}
          type="number"
          className="border border-gray-200 rounded-lg bg-gray-100 grow"
        />
      );
      break;
    case "url":
      inputPreviewJSX = (
        <input
          id={id}
          readOnly={true}
          type="url"
          className="border border-gray-200 rounded-lg bg-gray-100 grow"
        />
      );
      break;
    default:
      exhaustiveCheck(type);
  }

  return (
    <>
      <label htmlFor={id} className="sr-only">
        answer area
      </label>
      {inputPreviewJSX}
    </>
  );
}

type WithOptionsAnswerAreaProps = Readonly<{
  question: QuestionWithOptions;
  addNewOption: (question: QuestionWithOptions) => void;
  deleteOption: (question: QuestionWithOptions, optionId: string) => void;
}>;

function WithOptionsAnswerArea({
  question,
  addNewOption,
  deleteOption,
}: WithOptionsAnswerAreaProps) {
  const lastIndex = question.options.length - 1;

  return (
    <fieldset className="grow relative">
      <legend className="sr-only">options</legend>
      <ol className="flex flex-col gap-y-2">
        {question.options.map((option, index) => (
          <li
            key={option.id}
            className="w-full relative flex items-center gap-x-8px"
          >
            <Circle />
            <label htmlFor={option.id} className="sr-only">
              option number {index + 1}
            </label>
            <input
              type="text"
              id={option.id}
              name="option"
              defaultValue={option.value}
              placeholder={`Option ${index + 1}`}
              className="grow border border-gray-200 rounded-lg px-8px py-[0.3125rem]"
            />
            {lastIndex === index && (
              <button
                type="button"
                className="relative text-black"
                onClick={() => addNewOption(question)}
              >
                <Plus />
                <span className="sr-only">
                  add another option to this question
                </span>
              </button>
            )}
            {index > 1 && (
              <button
                type="button"
                className="relative text-black"
                onClick={() => deleteOption(question, option.id)}
              >
                <Delete />
                <span className="sr-only">delete this option</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </fieldset>
  );
}
