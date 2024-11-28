import type { Config } from "tailwindcss";
const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Correctly reference CSS variables
                primaryDark: 'var(--primaryDark)',
                primaryLight: 'var(--primary)',
                background: 'var(--background)',
                helper: 'var(--helper)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
			backgroundImage: {
				// Linear Gradient using defined colors
				'primaryGradient': 'linear-gradient(90deg, var(--primaryDark) 0%, var(--primaryLight) 100%)',
				// Gradient with opacity using defined colors
				'primaryGradientOpacity': 'linear-gradient(90deg, rgba(39, 82, 88, 0.8) 0%, rgba(34, 144, 141, 0.8) 100%)',
			},
			boxShadow: {
				primaryDark: '0 4px 6px var(--primaryDark, rgba(39, 82, 88, 0.4))',
				primaryLight: '0 4px 6px var(--primaryLight, rgba(34, 144, 141, 0.3))',
				helper: '0 4px 6px var(--helper, rgba(210, 44, 103, 0.4))',
				background: '0 4px 6px var(--background, rgba(211, 211, 211, 0.5))',
			},
        },
    },
};
export default config;