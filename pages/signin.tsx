import { ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Button from '../components/Button';
import Input from '../components/Input';
import { signIn } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const session = await unstable_getServerSession(
		ctx.req,
		ctx.res,
		authOptions);
	if (session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {}
	};
};

const Signin: NextPage = () => {
	return (
		<>
			<Head>
				<title>Logowanie</title>
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
			<div className='grid h-screen w-full place-items-center overflow-hidden px-4 text-sm font-medium'>
				<div className='w-full max-w-sm rounded-lg border-2 border-neutral-800 bg-neutral-800/50 shadow-md backdrop-blur'>
					<form
						className='p-3 md:p-6'
						onSubmit={(e) => {
							e.preventDefault();
							return false;
						}}
					>
						<div className='grid gap-y-3'>
							<Button
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='18'
										height='18'
										viewBox='0 0 16 16'
									>
										<path
											d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z'
											fill='#cbd5e1'
										></path>
									</svg>
								}
								onClick={() => signIn('google')}
							>
								Zaloguj się z Google
							</Button>
						</div>

						<div className='my-3 flex items-center px-3'>
							<hr className='w-full border-neutral-600' />
							<span className='mx-3 text-neutral-500'>lub</span>
							<hr className='w-full border-neutral-600' />
						</div>

						<div className='grid gap-y-3'>
							<Input
								placeholder='nazwa@email.com'
								disabled
							/>
							<Button
								icon={<EnvelopeIcon className='h-6 w-6' />}
								disabled
							>
								Zaloguj się przez email
							</Button>
						</div>
					</form>
					<Button
						href='/'
						icon={<ArrowLeftIcon className='h-8 w-8' />}
						className='mt-3 !w-full sm:mt-1'
					/>
				</div>
			</div>
		</>
	);
};

Signin.displayName = 'Signin';

export default Signin;
