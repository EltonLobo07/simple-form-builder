import { getId } from "@/utils/random";
import { FormStateProvider } from "./form-state";
import { HeadingInput } from "./HeadingInput";
import { PreviewLink } from "./PreviewLink";
import { AddQuestionBtn } from "./AddQuestionBtn";
import { Questions } from "./Questions";
import { Draft, Tick } from "../icons";

type Props = Readonly<{
  headingLvl: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export function FormBuilder(props: Props) {
  const Heading = `h${props.headingLvl}` as const;
  /*
      An alternative would be the `useId` hook
      Not using it to avoid turning this component into a client component
    */
  const formHeadingId = getId();

  return (
    <form
      aria-labelledby={formHeadingId}
      className="border border-gray-200 min-h-full max-w-[min(100%,40rem)] mx-auto flex flex-col"
    >
      <FormStateProvider>
        <header className="sticky top-0 z-10 bg-white pl-[20px] mb-24px pr-24px flex flex-wrap items-center justify-between gap-x-2 py-3 border-b border-gray-200">
          <Heading id={formHeadingId} className="grow">
            <HeadingInput />
          </Heading>
          <PreviewLink />
        </header>
        <div className="grow">
          <Questions />
          <AddQuestionBtn />
        </div>
        <div className="sticky bottom-0 bg-[#F6F8FA] px-24px py-4 border-t border-gray-200 flex justify-between gap-x-2">
          <button
            type="button"
            className="border border-gray-200 bg-white rounded-xl py-[5px] pl-[13px] pr-[15px] text-sm font-semibold text-gray-400 hover:text-black flex items-center gap-x-1"
          >
            <Draft />
            <span>Save as Draft</span>
          </button>
          <button
            type="button"
            className="border border-green-400 hover:border-green-500 bg-green-400 hover:bg-green-500 opacity-50 hover:opacity-100 rounded-xl py-[5px] pl-[13px] pr-[15px] text-sm font-semibold text-white flex items-center gap-x-1"
          >
            <Tick />
            <span>Publish form</span>
          </button>
        </div>
      </FormStateProvider>
    </form>
  );
}
