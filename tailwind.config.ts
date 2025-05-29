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
    			primaryDark: 'var(--primaryDark)',
    			primaryLight: 'var(--primary)',
    			background: 'hsl(var(--background))',
    			helper: 'var(--helper)',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		backgroundImage: {
    			primaryGradient: 'linear-gradient(90deg, var(--primaryDark) 0%, var(--primaryLight) 100%)',
    			primaryGradientOpacity: 'linear-gradient(90deg, rgba(39, 82, 88, 0.8) 0%, rgba(34, 144, 141, 0.8) 100%)'
    		},
    		boxShadow: {
    			primaryDark: '0 4px 6px var(--primaryDark, rgba(39, 82, 88, 0.4))',
    			primaryLight: '0 4px 6px var(--primaryLight, rgba(34, 144, 141, 0.3))',
    			helper: '0 4px 6px var(--helper, rgba(210, 44, 103, 0.4))',
    			background: '0 4px 6px var(--background, rgba(211, 211, 211, 0.5))'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")]
};
export default config;