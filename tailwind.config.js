/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: 'rgba(var(--color-primary) / <alpha-value>)',
				hover: 'rgba(var(--color-hover) / <alpha-value>)',
				secondary: 'rgba(var(--color-secondary) / <alpha-value>)',
				base: {
					100: 'rgba(var(--color-base-100) / <alpha-value>)',
					200: 'rgba(var(--color-base-200) / <alpha-value>)',
					300: 'rgba(var(--color-base-300) / <alpha-value>)',
				},
				content: 'rgba(var(--color-content) / <alpha-value>)',
				disabled: 'rgba(var(--color-disabled) / <alpha-value>)',
				error: 'rgba(var(--color-error) / <alpha-value>)',
				success: 'rgba(var(--color-success) / <alpha-value>)',
			},
		},
	},
	plugins: [],
};
