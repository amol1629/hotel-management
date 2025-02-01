import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			animation: {
				"fade-in": "fadeIn 0.5s ease-out forwards",
				"fade-in-up": "fadeInUp 0.6s ease-out forwards",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			colors: {
				primary: "#038C7F",
				secondary: "#F2C641",
				tertiary: {
					dark: "#F27405",
					light: "#F2C641",
				},
			},

			fontFamily: {
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
		},
	},
	plugins: [],
};
export default config;
