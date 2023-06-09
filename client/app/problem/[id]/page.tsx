import { FC, use } from 'react';
import ProblemPageContent from './ProblemPageContent';
import 'allotment/dist/style.css';
import { Problem } from '../problems';

interface ProblemProps {
	params: { id: string; },
}

const ProblemPage: FC<ProblemProps> = ({ params }) => {
	return (
		<div className='h-nav text-white'>
			<ProblemPageContent id={params.id} />
		</div >
	);
};

export default ProblemPage;