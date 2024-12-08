import * as v from "valibot";
import { QUESTION_TYPES, QUESTION_TYPES_WITHOUT_OPTIONS } from "./constants";

export const QuestionTypesSchema = v.picklist(QUESTION_TYPES);

export const QuestionCommonSchema = v.object({
  id: v.string(),
  title: v.string(),
  helpText: v.string(),
});

export const OptionSchmea = v.object({ id: v.string(), value: v.string() });

export const OptionsSchema = v.tupleWithRest(
  [OptionSchmea, OptionSchmea],
  OptionSchmea
);

export const QuestionWithOptionsSchema = v.object({
  ...QuestionCommonSchema.entries,
  type: v.literal("single-select"),
  options: OptionsSchema,
});

export const QuestionWithoutOptionsSchema = v.object({
  ...QuestionCommonSchema.entries,
  type: v.pipe(v.picklist(QUESTION_TYPES_WITHOUT_OPTIONS)),
  options: v.null(),
});

export const QuestionSchema = v.union([
  QuestionWithOptionsSchema,
  QuestionWithoutOptionsSchema,
]);

export const QuestionsSchema = v.array(QuestionSchema);
