import { getId } from "@/utils/random";

export function newOption() {
  return {
    id: getId(),
    value: "",
  };
}
