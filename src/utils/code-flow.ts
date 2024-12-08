export function exhaustiveCheck(x: never) {
  console.error("Unexpected value:", x);
}
