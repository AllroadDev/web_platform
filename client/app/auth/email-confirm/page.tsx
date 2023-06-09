import { FC } from 'react';
import EmailConfirmMain from './EmailConfirmMain';

interface EmailConfirmProps {
	searchParams: { token: string; },
}

const EmailConfirm: FC<EmailConfirmProps> = ({ searchParams }) => {
	return (
		<>
			<EmailConfirmMain token={searchParams.token} />
		</>
	);
};

export default EmailConfirm;