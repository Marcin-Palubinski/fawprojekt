import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			const posts = await prisma.post.findMany({
				where: {
					published: true,
				},
				include: {
					user: true,
				},
			});
			res.status(200).json(posts);
		} catch (error) {
			res.status(200).json([]);
		}
	} else if (req.method === 'POST') {
		const { title, content, userId } = req.body;
		try {
			const post = await prisma.post.create({
				data: {
					title,
					content,
					published: true,
					createdAt: new Date().toString(),
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
			res.status(201).json(post);
		} catch (error) {
			res.status(400).json({
				message: 'Błąd podczas tworzenia posta.',
			});
		}
	} else {
		res.status(405).json({
			message: 'Metoda nie jest obsługiwana.',
		});
	}
}
