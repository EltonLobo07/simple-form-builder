"use client";

import { AnimatePresence, motion } from "motion/react";
import { useFormState } from "./form-state";
import { QuestionComp } from "./QuestionComp";
import { QuestionCompSkeleton } from "./QuestionCompSkeleton";

export function Questions() {
  const questions = useFormState((state) => state.questions);
  const updateQuestion = useFormState((state) => state.updateQuestion);
  const deleteQuestion = useFormState((state) => state.deleteQuestion);

  if (questions === null) {
    return (
      <div className="px-8px tabAndUp:px-24px">
        <QuestionCompSkeleton />
      </div>
    );
  }

  let contentJSX: React.ReactNode = null;
  if (questions.length > 0) {
    contentJSX = (
      <ol className="px-8px tabAndUp:px-24px flex flex-col gap-y-4 mb-8">
        {questions.map((question) => (
          <motion.li
            key={question.id}
            layout={true}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <QuestionComp
              question={question}
              onChange={updateQuestion}
              onDelete={deleteQuestion}
            />
          </motion.li>
        ))}
      </ol>
    );
  }

  return <AnimatePresence>{contentJSX}</AnimatePresence>;
}
