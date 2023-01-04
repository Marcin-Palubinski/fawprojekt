import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';
import { UserQuick } from 'fawprojekt';

interface Props {
	user: UserQuick;
}

const Header: NextPage<Props> = ({ user }) => {
	if (!user) return null;
	return (
		<header className='w-screen h-16 border-b backdrop-blur bg-base-100/25'>
			<nav className='h-full container mx-auto px-4 flex items-center justify-between'>
				<Link href='/' className='font-medium text-xl'>
					FAWProjekt
				</Link>
				<Link
					href='/profile'
					className='border p-1 rounded-full flex items-center hover:bg-base-200'
				>
					<div className='w-8 h-8 relative'>
						<Image
							src={user.image}
							fill
							className='rounded-full'
							alt=''
						/>
					</div>
					<div className='px-2'>{user.name}</div>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
