import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Header from '../components/Header';
import { Post, UserQuick, Comment } from 'fawprojekt';
import moment from 'moment';
import 'moment/locale/pl';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext,
) => {
	const session = await unstable_getServerSession(
		ctx.req,
		ctx.res,
		authOptions,
	);
	if (!session) {
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	}
	const res = await fetch('http://localhost:3000/api/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			pmin: 0,
			pmax: 10,
			options: {
				user: true,
				comments: true,
			},
		}),
	});
	const data = await res.json();
	return {
		props: {
			user: session.user,
			posts: data.posts,
		},
	};
};

interface Props {
	user: UserQuick;
	posts: Post[];
}

const PostRow: NextPage<{ post: Post }> = ({ post }) => {
	return (
		<div className='flex gap-4 py-2 pt-4' key={post.id}>
			<div className='md:w-64 flex flex-col min-h-full gap-2 text-disabled'>
				<span className='font-semibold'>
					<Link
						href={`/users/${post?.user?.id}`}
						className='flex items-center w-fit'
					>
						<div className='w-8 h-8 relative'>
							<Image
								src={post?.user?.image}
								fill
								className='rounded-full'
								alt=''
							/>
						</div>
						<div className='px-2'>{post?.user?.name}</div>
					</Link>
				</span>
				<span className=''>👍 {post.reactions?.length}</span>
				<span className=' text-xs'>
					{moment(post.createdAt).startOf('day').fromNow()}
				</span>
			</div>
			<div className='flex flex-col justify-between gap-2 w-full'>
				<h2 className='text-2xl font-medium text-content'>
					{post.title}
				</h2>
				<p className='leading-relaxed'>{post.content}</p>
				<div className='text-xs w-full'>
					<CommentsComponent comments={post.comments} />
				</div>
			</div>
		</div>
	);
};

const CommentComponent: NextPage<{ comment: Comment }> = ({ comment }) => {
	return (
		<>
			<tr className='border-t w-full'>
				<td className='!w-max py-2'>
					<Link
						href={`/users/${comment.userId}`}
						className='flex items-center w-max'
					>
						<div className='w-8 h-8 relative aspect-square'>
							<Image
								src={comment.user?.image}
								fill
								className='rounded-full aspect-square'
								alt=''
							/>
						</div>
						<div className='px-2'>{comment.user?.name}</div>
					</Link>
				</td>
				<td className='w-full'>{comment.content}</td>
			</tr>
			<span>{moment(comment.createdAt).startOf('day').fromNow()}</span>
		</>
	);
};

const CommentsComponent: NextPage<{ comments: any }> = ({ comments }) => {
	return (
		<Disclosure>
			<Disclosure.Button className='text-content font-normal text-xs'>
				Komentarze {comments.length}
			</Disclosure.Button>
			<Disclosure.Panel className='text-gray-500 pt-4 w-full'>
				<div colSpan={2} className='flex gap-2 w-full pb-2'>
					<button>Skomentuj</button>
					<input
						type='text'
						className='w-full border rounded-md p-1'
					/>
				</div>
				<table>
					<tbody>
						{comments.map((comment: Comment) => (
							<CommentComponent
								key={comment.id}
								comment={comment}
							/>
						))}
					</tbody>
				</table>
			</Disclosure.Panel>
		</Disclosure>
	);
};

const Home: NextPage<Props> = ({ user, posts }) => {
	return (
		<>
			<Head>
				<title>FAWProjekt</title>
				<meta name='description' content='FAWProjekt' />
				<meta
					name='viewport'
					content='width=device-width, initial-uscale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header user={user} />
			<main className='mx-auto p-4 max-w-5xl'>
				<div className='divide-y-2'>
					{posts?.map((post) => (
						<PostRow key={post.id} post={post} />
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
