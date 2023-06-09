/* eslint-disable @next/next/no-img-element */
'use client';

import { FC, useState } from 'react';
import 'allotment/dist/style.css';
import { signOut, useSession } from 'next-auth/react';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import UserService from '../../../services/user.service';
import Modal from '../../../components/ui/Modal';
import EditInfoForm from './EditInfoForm';

interface ProblemProps {
	params: { id: string; },
}

const ProblemPage: FC<ProblemProps> = ({ params }) => {
	const { data: session } = useSession();
	const [image, setImage] = useState<any>();
	const [imagePreview, setImagePreview] = useState<any>(localStorage.getItem('mastercode-avatar'));
	const [modal, setModal] = useState<boolean>(false);
	const axiosAuth = useAxiosAuth();
	UserService.axiosAuth = axiosAuth;

	const logOut = () => {
		signOut({
			redirect: true,
			callbackUrl: '/auth/signin'
		});
	}

	const handleImage = (e) => {
		const avatar = e.target.files[0];
		setImage(avatar);
		setImagePreview(URL.createObjectURL(avatar));
	}

	const handleUpload = async (e) => {
		e.preventDefault();	
		const formData = new FormData();
		formData.append('file', image);
		try {
			const res = await UserService.uploadAvatar(formData);
			localStorage.setItem('mastercode-avatar', imagePreview);
		} catch(e) {
			console.log(e);
		}
	}

	return (
		<>
		<Modal visible={modal} setVisible={setModal}>
			<EditInfoForm setVisible={setModal} />
		</Modal>
		<div className='text-white flex flex-col max-w-5xl mx-auto'>
			<div className='flex mt-14'>
				<div className='flex flex-col items-center'>
					<img 
						className='rounded w-[250px] h-[250px]'
						src={
							imagePreview 
							? 
							imagePreview 
							:
							'http://ronaldmottram.co.nz/wp-content/uploads/2019/01/default-user-icon-8.jpg'}
						width={250}
						height={250}
						alt="User avatar"
					/>
					<form action="" className='flex mt-3'>
						<label className='cursor-pointer bg-orange-500 hover:bg-orange-600 rounded py-1 px-3'>
			  			<input
								onChange={handleImage}
								className='hidden' 
								accept="image/png, image/jpeg, image/webp, image/jpg" 
								type="file" 
								id="myAvatar" 
								name="avatar" />
							Choose Image
						</label> 
		  			<button 
							onClick={handleUpload}
							className='bg-blue-500 hover:bg-blue-600 rounded py-1 px-3 ml-3'>
							Submit
						</button>
					</form>
					<button
						onClick={() => setModal(true)} 
						className="bg-green-500 hover:bg-green-600 rounded py-1 px-3 mt-4">
						Edit Info
					</button>
					<button className="bg-green-500 hover:bg-green-600 rounded py-1 px-3 mt-4" onClick={logOut}>
						Sign Out
					</button>
				</div>
				<div className='flex flex-col ml-20 text'>
					<div 
					  className="w-[700px] h-[250px] bg-slate-500 rounded">
						<p className='p-2 border-b'>
							{session?.user?.first_name} {session?.user?.last_name}
						</p>
						<div className='p-2'>
						{session?.user?.additional_info}
						</div>
					</div>
					<div 
						className="w-[700px] h-[250px] bg-slate-500 mt-12 rounded">
						<p className='p-2 border-b'>
							Statistics	
						</p>
						<div className='flex'>
							<div className='h-full w-[50%] text-center'>
								<span 
									className='mt-10 h-32 w-32 rounded-[50%] border-2	inline-block p-9 text-5xl'>
									0
								</span>
							</div>
							<div className='flex flex-col mt-10 h-full w-[50%] mr-12 text-lg'>
								<div>
									<div className='border-b-8 rounded-md border-green-500 flex justify-between'>
										<span>Easy</span>
										<span>0/12</span>
									</div>
								</div>
								<div className='mt-2'>
									<div className='border-b-8 rounded-md flex justify-between border-yellow-300'>
										<span>Medium</span>
										<span>0/12</span>
									</div>
								</div>
								<div className='mt-2'>
									<div className='border-b-8 rounded-md flex justify-between border-red-700'>
										<span>Hard</span>
										<span>0/12</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
		</>
	);
};

export default ProblemPage;