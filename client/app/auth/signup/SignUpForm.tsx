'use client';

import Link from 'next/link';
import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import { TSignupLocal } from '../../../models/auth/request/auth-request.type';
import AuthService from '../../../services/auth.service';

export const errorStyles = 'bg-red-300 text-red-900 rounded p-1';

const SignUpForm: FC = () => {
	const axiosAuth = useAxiosAuth();
	AuthService.axiosAuth = axiosAuth;
	const {
		register, 
		handleSubmit, 
		reset,
		clearErrors, 
		getValues, 
		formState: { errors }
	} = useForm<TSignupLocal>({
		defaultValues: {}
	})

	const submit: SubmitHandler<TSignupLocal> = (data) => {
		try {
			AuthService.signupLocal(data);
			reset();
			alert('Check your email for verification message')
		} catch (e: any) {
			alert(e.message);
		}	
	}

	const error: SubmitErrorHandler<TSignupLocal> = (data) => {
		console.log(data)
	}

	const isEmail = (data: string) => {
		const regex = new RegExp(/^\S+@\S+\.\S+$/);
		return regex.test(data);
	} 

	const isPasswordCorrect = (data: string) => {
		const regex = new RegExp(
			'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
		);
		return regex.test(data);
	} 

	const isPasswordMatches = (data: string) => {
		const password = getValues('password');
		if (password !== data) return false
		return true;
	} 

	return (
			<>
				<div
				className='flex flex-col items-center mt-44 bg-slate-500 pt-10 pb-2 w-[20%] mx-auto rounded'
				>
					<p className='text-3xl mb-2'>Mastercode</p>
					<form 
					onSubmit={handleSubmit(submit, error)}
					className='flex flex-col items-center space-y-2'
					>
							<input
									className='w-72 rounded'
									type="text"
									placeholder='First Name'
									{...register('first_name', { required: true })}
							/>
							{ errors.first_name ? <p className={errorStyles}>You must provide your first name</p> : <></> }
							<input
									className='w-72 rounded'
									type="text"
									placeholder='Last Name'
									{...register('last_name', { required: true })}
							/>
							{ errors.last_name ? <p className={errorStyles}>You must provide your last name</p> : <></> }
							<input
									className='w-72 rounded'
									type="text"
									placeholder='Email'
									{...register('email', { required: true, validate: isEmail })}
							/>
							{ errors.email ? <p className={errorStyles}>Please provide correct email address</p> : <></> }
							<input
									className='w-72 rounded'
									type="password"
									placeholder='Password'
									{...register('password', { required: true, validate: isPasswordCorrect })}
							/>
							{ errors.password 
							? 
							<p className={'ml-2 mr-2 ' + errorStyles}>
								Password must be atleast 8 characters and contain upper case letters, lower case letters, numbers, and special symbols
							</p>
							: 
							<></> 
							}
							<input
									className='w-72 rounded'
									type="password"
									placeholder='Confirm password'
									{...register('confirm_password', { required: true, validate: isPasswordMatches })}
							/>
							{ errors.confirm_password ? <p className={errorStyles}>Passwords are not the same</p> : <></> }
							<button
							className='bg-green-500 hover:bg-green-600 rounded-md px-5 py-1 text-lg text-white'
							>
									SignUp
							</button>
					</form>
					<p className='mr-auto ml-2 mt-4 cursor-pointer hover:text-blue-900'>
						<Link href='auth/signin'>Have an account?</Link>
					</p>
				</div>
			</>
	);
};

export default SignUpForm;