import { DefaultSession, DefaultUser } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id?: String;
			role?: String;
		};
	}

	interface User extends DefaultUser {
		role?: String;
	}
}
