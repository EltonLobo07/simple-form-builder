import { BtnWithIcon } from "../components/BtnWithIcon";
import { Draft } from "../icons";

export function SaveAsDraftBtn() {
  return (
    <BtnWithIcon icon={<Draft />} theme="white" type="button" pending={false}>
      Save as Draft
    </BtnWithIcon>
  );
}
