/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

const tmpPosts = [
	{
		id: 1,
		title: 'Post 1',
		content: 'Content 1',
		userId: 1,
		createdAt: '2022-05-01T00:00:00.000Z',
		reactions: [1, 2],
	},
	{
		id: 2,
		title: 'Post 2',
		content: 'Content 2',
		userId: 2,
		createdAt: '2022-05-02T00:00:00.000Z',
		reactions: [1],
	},
];
const tmpUsers = [
	{
		id: 1,
		name: 'The Guru',
		image: 'https://lh3.googleusercontent.com/a/AEdFTp6HjgI26hZ4-eNLOEAfgJajgRgPq_qS18YslGtx=s96-c',
	},
	{
		id: 2,
		name: 'The Guru 2',
		image: 'https://lh3.googleusercontent.com/a/AEdFTp6HjgI26hZ4-eNLOEAfgJajgRgPq_qS18YslGtx=s96-c',
	},
];
const tmpComments = [
	{
		id: 1,
		userId: 1,
		postId: 1,
		content: 'Comment 1',
		createdAt: '2022-05-01T00:00:00.000Z',
	},
	{
		id: 2,
		postId: 1,
		userId: 2,
		content: 'Comment 2',
		createdAt: '2022-05-02T00:00:00.000Z',
	},
	{
		id: 3,
		postId: 2,
		userId: 1,
		content: 'Comment 3',
		createdAt: '2022-05-03T00:00:00.000Z',
	},
];
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		if (req.body) {
			const { pmin, pmax, options } = req.body;
			if (isNumber(pmin) && isNumber(pmax)) {
				const part = tmpPosts.slice(pmin, pmax);
				if (options?.user) {
					part.forEach((post) => {
						const user = tmpUsers.find((u) => u.id === post.userId);
						if (user) {
							post.user = user;
						}
					});
				}
				if (options?.comments) {
					part.forEach((post) => {
						post.comments = tmpComments.filter(
							(c) => c.postId === post.id,
						);
						post.comments.forEach((comment) => {
							const user = tmpUsers.find(
								(u) => u.id === comment.userId,
							);
							if (user) {
								comment.user = user;
							}
						});
					});
				}
				res.status(200).json({ posts: part });
			} else {
				res.status(400).json({ message: 'Bad request' });
			}
		} else {
			res.status(404).json({ message: 'Not found' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
};

const isNumber = (value: any): boolean => {
	return typeof value === 'number' && isFinite(value);
};
