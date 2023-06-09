import Link from 'next/link';
import { FC } from 'react';
import { Problem, ProblemDifficulty } from '../../models/problem/problem.type';

interface IProblemsProps {
	problems: Problem[];
}

const Problems: FC<IProblemsProps> = ({ problems }) => {
	return (
		<div className='flex flex-col mt-5 text-slate-300'>
			{
				problems.map((problem, i) => {
					const bg = (i % 2 === 0) ? 'bg-nav-blue' : '';
					const difficulty =
						problem.difficulty === ProblemDifficulty.EASY ? 'text-green-500'
							: problem.difficulty === ProblemDifficulty.MEDIUM ? 'text-yellow-300'
								: 'text-red-700';
					return (
						<div key={problem.title}
							className={'flex items-center h-12 divide-none ' + bg}>
							<div className='ml-4 h-full w-[75px] flex items-center'>
								{
									(i % 4 === 0 || i === 3) ? <>Accepted</> : <></>
								}
							</div>
							<div className='ml-28 hover:text-white h-full flex items-center w-[400px]'>
								<Link href={`/problem/${problem.id}`}>{`${i + 1}. ${problem.title}`}</Link>
							</div>
							<div className='ml-[500px] w-[100px] h-full flex items-center'>
								{problem.category.name}
							</div>
							<div className={'ml-[260px] h-full flex items-center ' + difficulty}>
								{problem.difficulty}
							</div>
						</div>
					);
				})
			}
		</div>
	);
};

export default Problems;