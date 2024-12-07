type ClassJoinParam = string | null | undefined | boolean;

/*
    could have used a library like this one: https://github.com/lukeed/clsx
    but for simple cases it might add some maintenance burden
*/
export function classJoin(...classes: Array<ClassJoinParam>): string {
  const res: Array<string> = [];
  for (const classNames of classes) {
    if (typeof classNames !== "string") {
      continue;
    }
    for (const className of classNames.split(/\s/u)) {
      if (className === "") {
        continue;
      }
      res.push(className);
    }
  }
  return res.join(" ");
}
