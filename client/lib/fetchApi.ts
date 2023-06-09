import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const BASE_URL = 'http://localhost:5000/api';

async function refreshToken(refreshToken: string) {
	const res = await fetch(BASE_URL + '/auth/refresh', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			refresh: refreshToken,
		}),
	});
	const data = await res.json();

	return data.accessToken;
}

export async function AuthGetApi(url: string) {
	const session = await getServerSession(authOptions);

	let res = await fetch(BASE_URL + url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session?.tokens.accessToken}`,
		},
	});

	if (res.status == 401) {
		if (session) {
			session.tokens.accessToken = await refreshToken(session?.tokens.refreshToken ?? '');
		}
		res = await fetch(BASE_URL + url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session?.tokens.accessToken}`,
			},
		});

		return await res.json();
	}

	return await res.json();
}
