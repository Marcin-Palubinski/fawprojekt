import { withAuth } from 'next-auth/middleware';

const adminPages = ['/admin', '/manage', '/messages'];

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			const path = req.nextUrl.pathname;
			if (adminPages.includes(path)) {
				return token?.role === 'admin';
			}
			return !!token;
		},
	},
});

export const config = { matcher: ['/admin', '/me', '/manage', '/messages'] };
