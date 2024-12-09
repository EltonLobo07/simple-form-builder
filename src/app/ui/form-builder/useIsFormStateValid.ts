import { useFormState } from "./form-state";
import { isFormBuilderStateValid } from "./helpers";

export function useIsFormStateValid() {
  const heading = useFormState((state) => state.heading);
  const questions = useFormState((state) => state.questions);
  const areChangesSaved = useFormState((state) => state.areChangesSaved);

  return isFormBuilderStateValid({
    heading,
    questions,
    areChangesSaved,
  });
}
