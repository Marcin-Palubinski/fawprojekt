import { withAuth } from 'next-auth/middleware';

const adminPages = ['/admin', '/manage'];

export default withAuth({
	callbacks: {
		authorized({ req, token }) {
			const path = req.nextUrl.pathname;
			if (adminPages.includes(path)) {
				return (token?.userRole || 'default') === 'admin';
			}
			return !!token;
		},
	},
});

export const config = { matcher: ['/admin', '/me', '/manage'] };
