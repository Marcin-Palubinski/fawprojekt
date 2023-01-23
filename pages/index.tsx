import axios from '../axios';
import { User } from 'global';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Button from '../components/Button';
import useSWRInfinite from 'swr/infinite';
import Input from '../components/Input';
import TextInput from '../components/TextInput';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/pl';
import { TrashIcon } from '@heroicons/react/24/solid';


const POST_PAGE_SIZE = 10;
const postsFetcher = (url: string, data: any) => axios.get(url, data).then(res => res.data);

const getKey = (pageIndex: number, previousPageData: any) => {
	return `/api/posts?_page=${pageIndex}&_limit=${POST_PAGE_SIZE}`;
};

const handleDelete = async (id: string, mutate: any) => {
	await axios.delete(`/api/posts/${id}`);
	mutate();
};

const Posts = ({ data, userId, mutate, loading }: { data: any, userId: string, mutate: any, loading: boolean; }) => {
	return (
		<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-4'>
			{loading}
			{data?.map((post: any) => (
				<div key={post.id} className='w-full max-w-md rounded-lg border-2 border-neutral-800 bg-neutral-800/50 shadow-md backdrop-blur p-2 grid gap-2'>
					<div className='flex justify-between'>
						<Link href={`/user/${post.user.id || 'system'}`} className='flex items-center gap-2 relative w-max'>
							<Image src={post.user.image} width={35} height={35} alt='' className='rounded-full' />
							{post.user.name}
						</Link>
						<span className='text-xs text-neutral-500'>{moment(post.createdAt).fromNow()}</span>
					</div>
					<h4>{post.title}</h4>
					<p className='text-sm text-neutral-300'>{post.content}</p>
					{post.user.id === userId && !loading && (
						<div className='flex'>
							<TrashIcon className='w-6 h-6 text-neutral-500 cursor-pointer mt-auto ml-auto hover:text-red-500' onClick={() => handleDelete(post.id, mutate)} />
						</div>
					)}
				</div>
			))}
		</section>
	);
};

const PostCreator = ({ user, mutate }: { user: any, mutate: any; }) => {
	return (
		<div className='w-full max-w-md rounded-lg border-2 border-neutral-800 bg-neutral-800/50 shadow-md backdrop-blur'>
			<form
				className='p-3 md:p-6'
				onSubmit={(e) => handlePostCreate(e, user.id, mutate)}
			>
				<h3 className='text-3xl text-center font-medium tracking-wide'>
					Utwórz post
				</h3>

				<div className='my-6 flex items-center px-3'>
					<hr className='w-full border-neutral-600' />
				</div>

				<div className='grid gap-y-3'>
					<Input
						placeholder='Tytuł'
					/>
					<TextInput placeholder='Treść' />
					<Button type='submit'>Utwórz</Button>
				</div>
			</form>
		</div>
	);
};

const Home: NextPage = () => {
	const { data: session, status } = useSession();
	const user = session?.user as User;

	const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, postsFetcher);
	const posts = data?.flat();
	return (
		<>
			<Head>
				<title>Title</title>
				<meta
					name='description'
					content='description content'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<section className='grid place-items-center gap-12 p-6'>
				{user ? <PostCreator user={user} mutate={mutate} /> : <Button href='/signin'>Przejdź do panelu logowania</Button>}
			</section>
			<section className='mx-auto p-6'>
				<Posts data={posts} userId={user?.id as string} mutate={mutate} loading={isValidating} />
			</section>
		</>
	);
};

async function handlePostCreate(e: any, userId: string, mutate: any) {
	e.preventDefault();
	const title = e.target[0].value;
	const content = e.target[1].value;
	const data = await axios.post('/api/posts', { title, content, userId })
		.then(res => res.data);
	mutate();
}

Home.displayName = 'Home';

export default Home;
