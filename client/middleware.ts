import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { TUserResponse, TUserRole } from './models/user/user.type';

export default withAuth(
	function middleware(req) {
		console.log('token: ', req.nextauth.token);
		const user = req.nextauth.token?.user as TUserResponse | undefined;
		const roles = user?.roles;
		console.log('roles: ', roles);

		if (req.nextUrl.pathname.startsWith('/admin') && !roles?.includes('admin'))
			return NextResponse.rewrite(new URL('/auth/signin?message=You Are Not Authorized!', req.url));
		if (req.nextUrl.pathname.startsWith('/problem') && !roles?.includes('user'))
			return NextResponse.rewrite(new URL('/auth/signin?message=You Are Not Authorized!', req.url));
		if (req.nextUrl.pathname.startsWith('/profile') && !roles?.includes('user'))
			return NextResponse.rewrite(new URL('/auth/signin?message=You Are Not Authorized!', req.url));
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	},
);

export const config = {
	matcher: ['/admin/:path*', '/problem/:path*', '/profile/:path*'],
};
