import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html
			lang='pl'
			className='bg-neutral-900 text-neutral-200'
		>
			<Head />
			<body className='selection:text-content min-h-screen select-none bg-neutral-900 text-neutral-200 selection:bg-primary-hover'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
