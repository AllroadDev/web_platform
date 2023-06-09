import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import { TCreateProblem } from '../../models/problem/problem.type';
import ProblemService from '../../services/problem.service';

interface IProblemFormProps {
	setVisible: Function;
}

const categories = [
	{ value: 'c2506317-dc39-465c-8d07-2a98fa67242d', name: 'Greedy' },
	{ value: '96b2aefe-90c6-4594-af95-67866ffe48d0', name: 'Array' },
	{ value: '0577d767-62e4-4723-849f-033e9155f82f', name: 'Sorting' },
	{ value: '4cf27ca3-625e-4e48-9fbf-86ec7f839819', name: 'Math' },
	{ value: 'a5a4db36-9640-4883-b313-764b9c6bb553', name: 'DP' },
];

const ProblemForm: FC<IProblemFormProps> = ({ setVisible }) => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;

	const {
		register,
		handleSubmit, 
		formState: { errors }
	} = useForm<TCreateProblem>({
		defaultValues: {}
	})

	const submit: SubmitHandler<TCreateProblem> = async (data) => {
		try {
			setVisible(false);
			// data.first_name = data.first_name || session?.user.first_name;
			// data.last_name = data.last_name || session?.user.last_name;
			// data.additional_info = data.additional_info || session?.user.additional_info as string | undefined;
			data.constraints = (data.constraints as unknown as string).split(',');
			data.inputs = JSON.parse(data.inputs as unknown as string)
			data.outputs = JSON.parse(data.outputs as unknown as string)
			await ProblemService.create(data);
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
									{...register('title', { required: true })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Description'
									{...register('description', { required: true })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Solution'
									{...register('solution', { required: true })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Constraints separated by comma'
									{...register('constraints')}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Inputs in JSON format'
									{...register('inputs', { required: true })}
							/>
							<textarea
									className='rounded w-[450px]'
									placeholder='Outputs in JSON format'
									{...register('outputs', { required: true })}
							/>
							<select
							 	className='py-1 rounded'
								{...register('difficulty', { required: true })}
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
								{...register('category_id', { required: true })}
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

export default ProblemForm;