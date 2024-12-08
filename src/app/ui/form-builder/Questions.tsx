"use client";

import { useFormState } from "./form-state";
import { QuestionComp } from "./QuestionComp";
import { QuestionCompSkeleton } from "./QuestionCompSkeleton";

export function Questions() {
  const questions = useFormState((state) => state.questions);
  const updateQuestion = useFormState((state) => state.updateQuestion);
  const deleteQuestion = useFormState((state) => state.deleteQuestion);

  if (questions === null) {
    return (
      <div className="px-24px">
        <QuestionCompSkeleton />
      </div>
    );
  }

  if (questions.length === 0) {
    return null;
  }

  return (
    <ol className="px-24px flex flex-col gap-y-4 mb-8">
      {questions.map((question, index) => (
        <li key={index}>
          <QuestionComp
            question={question}
            onChange={updateQuestion}
            onDelete={deleteQuestion}
          />
        </li>
      ))}
    </ol>
  );
}
