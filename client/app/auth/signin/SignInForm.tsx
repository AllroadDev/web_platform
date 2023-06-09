'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { TSigninLocal } from '../../../models/auth/request/auth-request.type';
import { errorStyles } from '../signup/SignUpForm';

const SignInForm: FC = () => {
	const {
		register, 
		handleSubmit, 
		clearErrors, 
		formState: { errors }
	} = useForm<TSigninLocal>({
		defaultValues: {}
	})

	const submit: SubmitHandler<TSigninLocal> = async({ email, password }) => {
		try {
			await signIn('credentials', {
				email,
				password,
				redirect: true,
				callbackUrl: '/'
			})
		} catch (e: any) {
			alert(e.message)
		}
	}

	return (
			<>
				<div
				className='flex flex-col items-center mt-44 bg-slate-500 pt-10 pb-2 w-[20%] mx-auto rounded'
				>
					<p className='text-3xl mb-2'>Mastercode</p>
					<form 
					onSubmit={handleSubmit(submit)}
					className='flex flex-col items-center space-y-2'
					>
							<input
									className='w-72 rounded'
									type="text"
									placeholder='Email'
									{...register('email', { required: true })}
							/>
							{ errors.email ? <p className={errorStyles}>You must provide your email</p> : <></> }
							<input
									className='w-72 rounded'
									type="password"
									placeholder='Password'
									{...register('password', { required: true })}
							/>
							{ errors.password ? <p className={errorStyles}>You must provide your password</p> : <></> }
							<button
							className='bg-green-500 hover:bg-green-600 rounded-md px-5 py-1 text-lg text-white'
							>
								SignIn
							</button>
					</form>
					<p className='mr-auto ml-2 mt-4 cursor-pointer hover:text-blue-900'>
						<Link href='auth/signup'>Don&apos;t have an account?</Link>
					</p>
				</div>
			</>
	);
};

export default SignInForm;