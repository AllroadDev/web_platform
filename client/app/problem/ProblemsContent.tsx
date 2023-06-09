'use client';

import { FC, useEffect, useState} from 'react';
import Select from '../../components/ui/select/Select';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import ProblemService from '../../services/problem.service';
import Problems from './Problems';
import { Problem } from '../../models/problem/problem.type';
import ProblemsInfoRow from './ProblemsInfoRow';

const ProblemsContent: FC = () => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;

	const [staticProblems, setStaticProblems] = useState<Problem[]>([]);
	const [problems, setProblems] = useState<Problem[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		fetchProblems();
	}, []);

	const fetchProblems = async () => { 
		try {
			const res = await ProblemService.findMany();
			setProblems(res.data);
			setStaticProblems(res.data);
		} catch (e: any) {
			console.log(e);
		}
	}

	const sortCategories = (sort) => {
		setSelectedCategory(sort);
		if (selectedDifficulty) {
			const problemsByCategory = staticProblems.filter((problem) => problem.category.name === sort)
			setProblems(problemsByCategory.filter((problem) => problem.difficulty === selectedDifficulty));
			return;
		}
		setProblems(staticProblems.filter((problem) => problem.category.name === sort));
	}

	const sortDifficulty = (sort) => {
		setSelectedDifficulty(sort);
		if (selectedCategory) {
			const problemsByDifficulty = staticProblems.filter((problem) => problem.difficulty === sort)
			setProblems(problemsByDifficulty.filter((problem) => problem.category.name === selectedCategory));
			return;
		}
		setProblems(staticProblems.filter((problem) => problem.difficulty === sort));
	}

	const sortSearchQuery = (e) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchQuery(searchValue);
		setProblems(staticProblems.filter((problem) => problem.title.toLowerCase().includes(searchValue)));
	}

	const resetToDefault = () => {
		setSelectedCategory('');
		setSelectedDifficulty('');
		setSearchQuery('');
		setProblems(staticProblems);
	}

	return (
		<>
			<div className='container mx-auto mt-3 flex-col'>
				<div className='mt-4 mb-4 ml-4 flex'>
					<Select
						value={selectedCategory}
						onChange={sortCategories} 
						defaultValue='Category' 
						options={[
							{ value: 'Greedy', name: 'Greedy' },
							{ value: 'Array', name: 'Array' },
							{ value: 'Sorting', name: 'Sorting' },
							{ value: 'Math', name: 'Math' },
							{ value: 'Dynamic Programming', name: 'DP' },
						]}
					/>
					<Select
						value={selectedDifficulty}
						onChange={sortDifficulty} 
						defaultValue='Difficulty' 
						options={[
							{ value: 'hard', name: 'Hard' },
							{ value: 'medium', name: 'Medium' },
							{ value: 'easy', name: 'Easy' },
						]}
					/>
					<input
					className='pl-1' 
					placeholder='Search...' value={searchQuery} onChange={sortSearchQuery} />
					<button 
						onClick={resetToDefault}
						className="bg-yellow-500 hover:bg-yellow-600 rounded py-1 px-3 ml-2">
						Reset
					</button>
				</div>
				<ProblemsInfoRow />
				<Problems problems={problems} />
			</div>
		</>
	);
};

export default ProblemsContent;