import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'DELETE') {
		const { id } = req.query;
		try {
			const post = await prisma.post.delete({
				where: {
					id: id as string,
				},
			});
			res.status(200).json(post);
		} catch (error) {
			res.status(400).json({
				message: 'Błąd podczas usuwania posta.',
			});
		}
	} else {
		res.status(405).json({
			message: 'Metoda nie jest obsługiwana.',
		});
	}
}
