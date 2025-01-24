import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        ...colors,

        current: "currentColor",

        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",

        transparent: "transparent",

        black: colors.black,

        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        slate: colors.slate,
        gray: colors.gray,
        neutral: colors.neutral,
        stone: colors.stone,
        green: colors.green,
        indigo: colors.indigo,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,

        red: colors.red,
        rose: colors.rose,
        sky: colors.sky,
        teal: colors.teal,
        violet: colors.violet,
        yellow: colors.amber,
        white: colors.white,
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
