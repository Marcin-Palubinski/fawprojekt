import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pl';
import { useState } from 'react';
import { likePost } from '../src/social';

const CardPost = ({
	id,
	user,
	body,
	title,
	createdAt,
	comments,
	likes,
	makeLike,
}) => {
	const [loading, setLoading] = useState(false);
	const date = moment(createdAt).startOf('day').fromNow();

	return (
		<div
			className={`p-2 pb-0 rounded-lg shadow-lg hover:shadow-xl transition-all snap-start ${
				loading ? 'bg-base-300' : 'bg-base-100'
			}`}
		>
			<div className='flex justify-between'>
				<div className='flex items-center gap-4 p-2'>
					<div className='w-12 h-12 relative'>
						<Image
							fill
							src={user?.image}
							alt={user?.firstName}
							className='rounded-full w-12 h-12 z-0'
							sizes='(max-width: 768px) 96px, 96px'
						/>
					</div>
					<h2 className='font-medium'>
						{user?.firstName + ' ' + user?.lastName}
					</h2>
				</div>
				<h5 className='p-2 text-disabled text-xs'>{date}</h5>
			</div>
			<p className='px-2'>{title}</p>
			<div className='p-2 pb-0'>
				<div className='relative aspect-square'>
					<p>{body}</p>
				</div>
			</div>
			<div className='flex justify-between text-xs text-disabled items-center py-1'>
				<div className='p-2'>
					<button
						className='hover:bg-base-300 p-2 rounded-full cursor-pointer'
						disabled={loading}
						onClick={async () => {
							console.log('like');
							setLoading(true);
							await makeLike(id, {
								id: id,
								user: user.id,
								title: title,
								body: body,
								createdAt: createdAt,
								likes: likes,
							});
							setLoading(false);
						}}
					>
						<span className='text-base'>👍</span>
						{likes?.length || ''}
					</button>
				</div>
				<div className='p-2'>
					<a>Komentarze: {comments?.length || 'brak'}</a>
				</div>
			</div>
		</div>
	);
};

export default CardPost;
