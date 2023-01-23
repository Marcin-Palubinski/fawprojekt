import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		const { id } = req.query;
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: id as string,
				},
			});
			res.status(200).json(user);
		} catch (error) {
			res.status(400).json({
				message: 'Błąd podczas pobierania danych użytkownika',
			});
		}
	} else {
		res.status(405).json({
			message: 'Metoda nie jest obsługiwana.',
		});
	}
}
