import NextAuth from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		tokens: {
			accessToken: string;
			refreshToken: string;
		};
		user: {
			id: string;
			first_name: string;
			last_name: string;
			email: string;
			avatar?: File | null | undefined;
			additional_info?: string | null | undefined;
			roles: TUserRole[];
			comments: Comment[];
			is_email_confirmed: boolean;
			created_at: Date;
			updated_at: Date;
		};
	}
}
