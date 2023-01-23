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
				['primary-hover']:
					'rgba(var(--color-primary-hover) / <alpha-value>)',
			},
		},
	},
	plugins: [],
};
