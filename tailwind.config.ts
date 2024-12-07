import type { Config } from "tailwindcss";

function range(start: number, end: number, step: number) {
  const res: number[] = [];
  const endPlusOne = end + 1;
  for (let i = start; i < endPlusOne; i += step) {
    res.push(i);
  }
  return res;
}

const extendedSpacing = range(8, 128, 8)
  .map((num) => `${num}px`)
  .reduce<Record<string, string>>((res, pxStr) => {
    res[pxStr] = pxStr;
    return res;
  }, {});

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // these defaults have proven to work well
      screens: {
        tabAndUp: "45rem", // 720px
        laptopAndUp: "68.75rem", // 1100px
      },
      // `rem` is not always the best choice, especially to define horizontal spacing
      // Add `px` based classes too
      spacing: extendedSpacing,
    },
  },
  plugins: [],
} satisfies Config;
