import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const res = await fetch('http://localhost:5000/api/auth/local/signin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});
				const user = await res.json();

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			return { ...token, ...user };
		},
		async session({ session, token, user }) {
			session.user = token.user as any;
			session.tokens = token.tokens as any;
			console.log(session);
			return session;
		},
	},

	pages: {
		signIn: '/auth/signin',
	},
};
export default NextAuth(authOptions);
