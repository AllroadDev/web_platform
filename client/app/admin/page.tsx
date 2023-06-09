'use client';

import { FC, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/select/Select';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import { Problem, ProblemDifficulty } from '../../models/problem/problem.type';
import { TUserResponse } from '../../models/user/user.type';
import ProblemService from '../../services/problem.service';
import UserService from '../../services/user.service';
import AdminProblemsContent from './AdminProblemsContent';
import AdminUsersContent from './AdminUsersContent';
import ProblemForm from './ProblemForm';

interface ProblemProps {
	params: { id: string; },
}

const AdminPage: FC<ProblemProps> = ({ params }) => {
	const axiosAuth = useAxiosAuth();
	ProblemService.axiosAuth = axiosAuth;
	UserService.axiosAuth = axiosAuth;

	const [modal, setModal] = useState<boolean>(false);
	const [showProblems, setShowProblems] = useState<boolean>(false);
	const [showUsers, setShowUsers] = useState<boolean>(false);
	const [staticProblems, setStaticProblems] = useState<Problem[]>([]);
	const [problems, setProblems] = useState<Problem[]>([]);
	const [users, setUsers] = useState<TUserResponse[]>([]);

	// useEffect(() => {
	// 	fetchProblems();
	// }, []);

	// const fetchProblems = async () => { 
	// 	try {
	// 		const res = await ProblemService.findMany();
	// 		setProblems(res.data);
	// 		setStaticProblems(res.data);
	// 	} catch (e: any) {
	// 		console.log(e);
	// 	}
	// }

	const fetchUsers = async () => {
		try {
			const res = await UserService.findMany();
			setUsers(res.data);
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<Modal visible={modal} setVisible={setModal}>
				<ProblemForm setVisible={setModal} />
			</Modal>
			<div className='h-nav'>
				<div className='flex mt-4 ml-8 text-white'>
					<button
						onClick={() => { 
							setShowUsers(false); 
							setShowProblems(!showProblems);
						}} 
						className="bg-green-500 hover:bg-green-600 rounded py-1 px-3 mt-4">
						Problems
					</button>
					<button 
						onClick={() => setModal(true)}
						className="bg-yellow-500 hover:bg-yellow-600 rounded py-1 px-3 mt-4 ml-2">
						Add Problem
					</button>
					<button
						onClick={() => { 
							setShowProblems(false);
							setShowUsers(!showUsers);
						}} 
						className="bg-blue-500 hover:bg-blue-600 rounded py-1 px-3 mt-4 ml-2">
						Users
					</button>
				</div>
			{
				showProblems 
				?
				<AdminProblemsContent />
				:
				<></>
			}
			{
				showUsers 
				?
				<AdminUsersContent />
				:
				<></>
			}
			</div >
		</>
	);
};

export default AdminPage;