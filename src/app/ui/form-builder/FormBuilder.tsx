import { getId } from "@/utils/random";
import { FormStateProvider } from "./form-state";
import { HeadingInput } from "./HeadingInput";
import { PreviewLink } from "./PreviewLink";
import { AddQuestionBtn } from "./AddQuestionBtn";
import { Questions } from "./Questions";
import { Tick } from "../icons";
import { Notifier } from "./Notifier";
import { BtnWithIcon } from "../components/BtnWithIcon";
import { SaveAsDraftBtn } from "./SaveAsDraftBtn";

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
        <div className="sticky top-0 z-10 bg-white">
          <header className="flex flex-wrap items-center justify-between gap-x-2 border-b border-gray-200 py-3 pl-[20px] pr-24px">
            <Heading id={formHeadingId} className="grow">
              <HeadingInput />
            </Heading>
            <PreviewLink />
          </header>
          <Notifier />
        </div>
        <div className="grow">
          <Questions />
          <AddQuestionBtn />
        </div>
        <div className="sticky bottom-0 bg-[#F6F8FA] px-24px py-4 border-t border-gray-200 flex justify-between gap-x-2">
          <SaveAsDraftBtn />
          <BtnWithIcon
            icon={<Tick />}
            theme="green"
            pending={false}
            type="submit"
          >
            Publish form
          </BtnWithIcon>
        </div>
      </FormStateProvider>
    </form>
  );
}
