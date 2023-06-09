'use client';

import axios from '../axios';
import { signIn, useSession } from 'next-auth/react';

export const useRefreshToken = () => {
	const { data: session } = useSession();

	const refreshToken = async () => {
		const res = await axios.post('/auth/refresh', undefined, {
			headers: {
				Authorization: `Bearer ${session?.tokens?.refreshToken}`,
			},
		});

		if (session) session.tokens.accessToken = res.data.accessToken;
		else signIn();
	};

	return refreshToken;
};
