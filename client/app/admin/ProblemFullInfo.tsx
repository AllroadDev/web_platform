import { FC } from 'react';
import { Problem } from '../../models/problem/problem.type';

interface IProblemFullInfoProps {
	problem: Problem;
	setVisible: Function;
}

const ProblemFullInfo: FC<IProblemFullInfoProps> = ({ problem, setVisible }) => {
	return (
			<div className='max-w-3xl'>
				{Object.entries(problem).map((e) => {
					return (
						<p key={e[0]} className='p-1'>
							{ typeof e[1] === 'object'
							? 
								`${e[0]}: ${JSON.stringify(e[1])}`
							:
								`${e[0]}: ${e[1].toString()}`
							}			
						</p>
					)
				})}
			</div>
	);
};

export default ProblemFullInfo;