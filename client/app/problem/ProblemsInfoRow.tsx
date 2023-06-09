import { FC} from 'react';

const ProblemsInfoRow: FC = () => {
	return (
		<div
			className=
			'flex text-slate-300 w-full h-10 border-b-2 border-slate-300 items-center text-lg font-semibold'
		>
			<div className='ml-5'>Status</div>
			<div className='ml-32'>Title</div>
			<div className='ml-[850px]'>Category</div>
			<div className='ml-[285px]'>Difficulty</div>
		</div>
	);
};

export default ProblemsInfoRow;