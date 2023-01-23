import { FC } from 'react';
import { User } from 'global';
import Footer from './Footer';
import Header from './Header';
import { useSession } from 'next-auth/react';

const Layout: FC<{
	children?: React.ReactNode;
	container?: boolean;
	fullScreen?: boolean;
	className?: string;
}> = ({ children, container, fullScreen = false, className }) => {
	const { data: session, status } = useSession();

	let classes = className ?? '';

	if (fullScreen) {
		classes = `${classes} min-h-[calc(100vh-13rem-4px)] sm:min-h-[calc(100vh-8rem-4px)] overflow-x-hidden`;
	}
	if (container) {
		classes = `${classes} container mx-auto p-8`;
	}
	return (
		<>
			{(session && status === 'authenticated') ? <Header user={session.user as User} /> : null}
			<main className={classes}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
