import { FC } from 'react';
import 'allotment/dist/style.css';

interface AboutProps {
	params: { id: string; },
}

const AboutPage: FC<AboutProps> = ({ params }) => {
	return (
		<div className='flex flex-col container mx-auto text-white'>
			<p className='text-2xl pt-4'>This app was created by Vitalii Boichuk.</p>
		</div>
	);
};

export default AboutPage;