'use client';

import { FC, useEffect } from 'react';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import EmailService from '../../../services/email.service';

interface EmailConfirmMainProps {
	token: string,
}

const EmailConfirmMain: FC<EmailConfirmMainProps> = ({ token }) => {
	const axiosAuth = useAxiosAuth();
	EmailService.axiosAuth = axiosAuth;
 
	useEffect(() => {
		confirmEmail();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	const confirmEmail = async () => { 
		try {
			await EmailService.confirmEmail({ token });
		} catch (e: any) {
			if (e?.statusCode !== 409) console.log(e);
		}
	}

	return (
			<div className='text-white text-xl p-5'>
				Email was confirmed, now you can Sign In.
			</div>
	);
};

export default EmailConfirmMain;