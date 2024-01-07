import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-grey": "#374151",
        "medium-grey": "#212832",
        "heavy-grey": "#1b1f20",
        "logo-red": "#c63838",
        tang: "#d26011",
        "dark-tang": "#ac5125",
      },
    },
  },
  plugins: [],
};
export default config;
