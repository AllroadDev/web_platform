import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import { Problem, TUpdateProblem, TUpdateProblemClientForm } from '../../models/problem/problem.type';
import ProblemService from '../../services/problem.service';

interface IProblemFormProps {
	problem: Problem;
	setVisible: Function;
}

const categories = [
	{ value: 'c2506317-dc39-465c-8d07-2a98fa67242d', name: 'Greedy' },
	{ value: '96b2aefe-90c6-4594-af95-67866ffe48d0', name: 'Array' },
	{ value: '0577d767-62e4-4723-849f-033e9155f82f', name: 'Math' },
	{ value: '4cf27ca3-625e-4e48-9fbf-86ec7f839819', name: 'Sorting' },
	{ value: 'a5a4db36-9640-4883-b313-764b9c6bb553', name: 'DP' },
];

const ProblemFormEdit: FC<IProblemFormProps> = ({ problem, setVisible }) => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;

	const {
		register,
		handleSubmit, 
		formState: { errors }
	} = useForm<TUpdateProblemClientForm>({
		defaultValues: {
			title: problem.title,
			description: problem.description,
			solution: problem.solution,
			constraints: problem.constraints.toString(),
			inputs: JSON.stringify(problem.inputs),
			outputs: JSON.stringify(problem.outputs),
			category_id: problem.category.id,
			difficulty: problem.difficulty,
		}
	})

	const submit: SubmitHandler<TUpdateProblemClientForm> = async (data) => {
		try {
			setVisible(false);
			const tmpData = data as TUpdateProblem;
			tmpData.constraints = data?.constraints?.split(',');
			tmpData.inputs = JSON.parse(data.inputs!);
			tmpData.outputs = JSON.parse(data.outputs!);
			await ProblemService.update(problem.id, tmpData);
		} catch (e: any) {
			console.log(e);
		}
	}

	return (
			<>
				<div
				>
					<form 
					onSubmit={handleSubmit(submit)}
					className='flex flex-col items-center space-y-2'
					>
							<input
									className='w-[450px] rounded'
									type="text"
									placeholder='Title'
									{...register('title', { required: false })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Description'
									{...register('description', { required: false })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Solution'
									{...register('solution', { required: false })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Constraints separated by comma'
									{...register('constraints')}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Inputs in JSON format'
									{...register('inputs', { required: false })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Outputs in JSON format'
									{...register('outputs', { required: false })}
							/>
							<select
							 	className='py-1 rounded'
								{...register('difficulty', { required: false })}
								>
								<option disabled value={''}>Difficulty</option>
								<option key='easy' value='easy'>
									Easy
								</option>
								<option key='medium' value='medium'>
									Medium
								</option>
								<option key='hard' value='hard'>
									Hard
								</option>
							</select>

							<select
							 	className='py-1 rounded'
								{...register('category_id', { required: false })}
								>
									<option disabled value={''}>Category</option>
									{categories.map((option) =>
										<option key={option.value} value={option.value}>
											{option.name}
										</option>
									)}
							</select>

							<button
								className='bg-green-500 hover:bg-green-600 rounded-md px-5 py-1 text-lg text-white'
							>
								Confirm
							</button>
					</form>
				</div>
			</>
	);
};

export default ProblemFormEdit;