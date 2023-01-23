import Link from 'next/link';
import {
	Bars3Icon,
	Bars3BottomRightIcon,
	HomeIcon,
	PowerIcon,
	QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import { Popover, Transition } from '@headlessui/react';
import { User } from 'global';
import { FC } from 'react';
import Button from './Button';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const MenuItems = [
	{
		name: 'Strona główna',
		path: '/',
		icon: <HomeIcon className='h-6 w-6' />,
	},
	{
		name: 'Pomoc',
		path: '/help',
		icon: <QuestionMarkCircleIcon className='h-6 w-6' />,
	},
];

const Header: FC<{ user: User; }> = ({ user }) => {
	return (
		<header className='bgblur sticky left-0 top-0 h-16 border-b-2 border-neutral-800 shadow-md z-10'>
			<section className='container mx-auto flex h-full items-center justify-between px-4'>
				<Link
					href='/'
					className='text-2xl font-semibold text-primary'
				>
					FAWprojekt
				</Link>
				<div className='flex items-center gap-3'>
					<UserComponent user={user} />
					<MenuComponent />
				</div>
			</section>
		</header>
	);
};

const availableRoles = {
	['admin']: {
		name: 'Administrator',
		color: 'text-red-500',
	},
	['user']: {
		name: 'Użytkownik',
		color: 'text-green-500',
	}
} as any;

const UserComponent: FC<{ user: User; }> = ({ user }) => {
	const userRole = availableRoles[user.role ?? 'user'];
	return (
		<Popover className='relative'>
			<Popover.Button className='grid h-10 w-10 place-content-center rounded-full shadow-md hover:bg-primary active:bg-primary-hover'>
				{user?.image ? (
					<div className='relative h-9 w-9 rounded-full'>
						<Image
							src={user?.image ?? ''}
							alt={user?.name ?? ''}
							fill
							className='rounded-full'
						/>
					</div>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						className='h-8 w-8 fill-white hover:fill-primary'
					>
						<path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z' />
					</svg>
				)}
			</Popover.Button>
			<Transition
				enter='transition ease-in duration-200'
				enterFrom='opacity-0 -translate-y-2'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-out duration-200'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-2'
			>
				<Popover.Panel className='bgblur absolute -right-12 top-7 w-max rounded-md border-2 border-neutral-800 bg-neutral-800/50 shadow-md'>
					<span className='flex flex-col border-b border-neutral-700 py-1 text-center text-xs'>
						{userRole.name}
					</span>
					<Link href={`/user/${user?.id}`} className='flex flex-col px-3 py-2'>
						{user?.name ?? ''}
						<span className='text-xs text-neutral-400'>
							{user?.email ?? ''}
						</span>
					</Link>
					<div className='border-t border-neutral-700 bg-neutral-800/50'>
						<Button
							className='!w-full !justify-start gap-3 bg-transparent'
							icon={<PowerIcon className='h-6 w-6' />}
							onClick={() => signOut()}
						>
							Wyloguj się
						</Button>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

const MenuComponent = () => {
	return (
		<Popover
			className='relative'
			as='nav'
		>
			{({ open }) => (
				<>
					<Popover.Button className='rounded-full p-1 hover:bg-primary focus:bg-primary active:bg-primary-hover'>
						{open ? (
							<Bars3BottomRightIcon className='h-8 w-8' />
						) : (
							<Bars3Icon className='h-8 w-8' />
						)}
					</Popover.Button>
					<Transition
						enter='transition ease-in duration-200'
						enterFrom='opacity-0 -translate-y-2'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-out duration-200'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-2'
					>
						<Popover.Panel
							className={`bgblur absolute right-0 top-7 w-max divide-y divide-neutral-700 rounded-md border-2 border-neutral-800 shadow-md`}
						>
							{MenuItems.map((item) => (
								<div key={item.name}>
									<MenuItem {...item} />
								</div>
							))}
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

const MenuItem = ({
	name,
	path,
	icon,
}: {
	name: string;
	path?: string;
	icon?: JSX.Element;
}) => {
	return (
		<Button
			className='!w-full !justify-start bg-transparent'
			href={path}
			icon={icon}
		>
			{name}
		</Button>
	);
};

export default Header;
