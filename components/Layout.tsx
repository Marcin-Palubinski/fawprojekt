import { FC } from 'react';
import { useSession } from 'next-auth/react';
import GuestView from '../components/views/GuestView';
import UserView from '../components/views/UserView';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	const { data: session, status } = useSession();
	if (session && status === 'authenticated') {
		return <UserView session={session}>{children}</UserView>;
	}
	return <GuestView />;
};

export default Layout;
