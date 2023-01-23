import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';

const containers = ['Profile', 'Settings'];
const userContainers = ['Home', 'Profile', 'Settings', 'Messages'];
const fullScreenContainers = ['Home', 'Signin'];

export default function App({ Component, pageProps }: AppProps) {
	const isContainer = containers.includes(
		Component.displayName || Component.name,
	);
	const isUserContainer = userContainers.includes(
		Component.displayName || Component.name,
	);
	const isFullScreenContainer = fullScreenContainers.includes(
		Component.displayName || Component.name,
	);

	return (
		<SessionProvider session={pageProps.session}>
			{isUserContainer ? (
				<Layout
					container={isContainer}
					fullScreen={isFullScreenContainer}
				>
					<Component {...pageProps} />
				</Layout>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}
