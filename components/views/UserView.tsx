import { FC } from 'react';
import Header from '../Header';

interface UserViewProps {
	session: any;
	children: React.ReactNode;
}

const UserView: FC<UserViewProps> = ({ session, children }) => {
	return (
		<>
		{children}
		</>
	);
};

export default UserView;
