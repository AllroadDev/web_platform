import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import { TUpdateUser } from '../../../models/user/user.type';
import UserService from '../../../services/user.service';

interface IEditInfoFormProps {
	setVisible: Function;
}

const EditInfoForm: FC<IEditInfoFormProps> = ({ setVisible }) => {
	const { data: session } = useSession();
	const axiosAuth = useAxiosAuth();
	UserService.axiosAuth = axiosAuth;

	const {
		register,
		handleSubmit, 
		formState: { errors }
	} = useForm<TUpdateUser>({
		defaultValues: {}
	})

	const submit: SubmitHandler<TUpdateUser> = async(data) => {
		try {
			setVisible(false);
			data.first_name = data.first_name || session?.user.first_name;
			data.last_name = data.last_name || session?.user.last_name;
			data.additional_info = data.additional_info || session?.user.additional_info as string | undefined;
			await UserService.update(data, session?.user.id);
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
									className='w-72 rounded'
									type="text"
									placeholder='First name'
									{...register('first_name')}
							/>
							<input
									className='w-72 rounded'
									type="text"
									placeholder='Last name'
									{...register('last_name')}
							/>
							<textarea
									className='rounded w-[350px]'
									placeholder='Additional info'
									maxLength={1000}
									{...register('additional_info')}
							/>
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

export default EditInfoForm;