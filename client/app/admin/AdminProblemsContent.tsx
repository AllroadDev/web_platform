'use client';

import { FC, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/select/Select';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import { Problem, ProblemDifficulty } from '../../models/problem/problem.type';
import ProblemService from '../../services/problem.service';
import ProblemFormEdit from './ProblemFormEdit';
import ProblemFullInfo from './ProblemFullInfo';

interface ProblemProps {
	params?: { id: string; },
}

const AdminProblemsContent: FC<ProblemProps> = ({ params }) => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;

	const [modal, setModal] = useState<boolean>(false);
	const [modalProblemInfo, setModalProblemInfo] = useState<boolean>(false);


	const [editProblem, setEditProblem] = useState<Problem>();
	const [problemInfo, setProblemInfo] = useState<Problem>();

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

	const editProblemHandler = (problem: Problem) => {
		setEditProblem(problem);
		setModal(true);
	}

	const showProblemFullInfo = (problem: Problem) => {
		setProblemInfo(problem);
		setModalProblemInfo(true);
	}

	const deleteProblem = async (problem: Problem) => {
		if (window.confirm('Are you sure?')) {
			try {
				await ProblemService.delete(problem.id);
				await fetchProblems();
			} catch (e) {
				console.log(e);
			}
		}
	}

	return (
		<>
			{
				editProblem 
				?
				<Modal visible={modal} setVisible={setModal}>
					<ProblemFormEdit setVisible={setModal} problem={editProblem} />
				</Modal>
				:
				<></>
			}
			{
				problemInfo 
				?
				<Modal visible={modalProblemInfo} setVisible={setModalProblemInfo}>
					<ProblemFullInfo setVisible={setModalProblemInfo} problem={problemInfo} />
				</Modal>
				:
				<></>
			}
			<div className='container mx-auto mt-3 flex-col'>
					<div className='mt-12 mb-4 ml-4 flex'>
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
						placeholder='Search...' value={searchQuery} onChange={sortSearchQuery} 
						/>
						<button 
							onClick={resetToDefault}
							className="bg-yellow-500 hover:bg-yellow-600 rounded py-1 px-3 ml-2">
							Reset
						</button>
					</div>
					<div
						className=
							'flex text-slate-300 w-full h-10 border-b-2 border-slate-300 items-center text-lg font-semibold'
					>
						<div className='ml-4'>Title</div>
						<div className='ml-[650px]'>Category</div>
						<div className='ml-[285px]'>Difficulty</div>
					</div>
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
								<div className='ml-4 h-full flex items-center w-[400px]'>
									<p
										onClick={() => showProblemFullInfo(problem)} 
										className='cursor-pointer hover:text-white'>
										{`${i + 1}. ${problem.title}`}
									</p>
								</div>
								<div className='ml-[300px] w-[100px] h-full flex items-center'>
									{problem.category.name}
								</div>
								<div className={'ml-[260px] h-full w-8 flex items-center ' + difficulty}>
									{problem.difficulty}
								</div>
								<div className='flex w-24 ml-64'>
									<button
										onClick={() => editProblemHandler(problem)} 
										className="bg-green-600 hover:bg-green-700 rounded py-1 px-3">
										Edit
									</button>
									<button
										onClick={async () => await deleteProblem(problem)} 
										className="bg-red-500 hover:bg-red-600 rounded py-1 px-3 ml-2">
										Delete
									</button>
								</div>
							</div>
						);
					})
				}
				</div>
			</div>
		</>
	);
};

export default AdminProblemsContent;