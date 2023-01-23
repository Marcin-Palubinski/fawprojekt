import NextAuth, { Awaitable, NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prismadb';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			checks: 'state',
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 dni
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET as string,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user?.role) {
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token, user }) {
			if (session?.user && token?.role) {
				session.user.role = token.role as string;
			}
			if (session?.user && token?.sub) {
				session.user.id = token.sub as string;
			}
			return session;
		},
	},
	pages: {
		signIn: '/signin',
	},
	events: {
		createUser: async ({ user }) => {
			try {
				const count = await prisma.admin.count({
					where: {
						email: user.email as string,
					},
				});

				if (count > 0) {
					await prisma.user.update({
						where: {
							id: user.id,
						},
						data: {
							role: 'admin',
						},
					});
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET as string,
};

export default NextAuth(authOptions);
