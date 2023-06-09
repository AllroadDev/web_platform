'use client';

import { FC, useEffect, useState } from 'react';
import Modal from '../../components/ui/Modal';
import Select from '../../components/ui/select/Select';
import useAxiosAuth from '../../lib/hooks/useAxiosAuth';
import { Problem, ProblemDifficulty } from '../../models/problem/problem.type';
import { TUserResponse } from '../../models/user/user.type';
import ProblemService from '../../services/problem.service';
import UserService from '../../services/user.service';
import ProblemFormEdit from './ProblemFormEdit';
import ProblemFullInfo from './ProblemFullInfo';

interface ProblemProps {
	params?: { id: string; },
}

const AdminUsersContent: FC<ProblemProps> = ({ params }) => {
	const axiosAuth = useAxiosAuth();
	UserService.axiosAuth = axiosAuth;

	const [staticUsers, setStaticUsers] = useState<TUserResponse[]>([]);
	const [users, setUsers] = useState<TUserResponse[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		fetchProblems();
	}, []);

	const fetchProblems = async () => { 
		try {
			const res = await UserService.findMany();
			setUsers(res.data);
			setStaticUsers(res.data);
		} catch (e: any) {
			console.log(e);
		}
	}

	const sortSearchQuery = (e) => {
		const searchValue = e.target.value;
		setSearchQuery(searchValue);
		setUsers(staticUsers.filter((user) => user.email.includes(searchValue)));
	}

	return (
		<div className='container mx-auto mt-12 flex-col text-slate-300 text-lg flex-wrap'>
			<div className='mt-12 mb-4 ml-4 flex'>
						<input
						value={searchQuery} onChange={sortSearchQuery} 
						className='pl-1 text-black' 
						placeholder='Search by email...' 
						/>
					</div>
			<div
					className=
					'flex text-slate-300 w-full h-10 border-b-2 border-slate-300 items-center text-lg font-semibold justify-between flex-wrap'
				>
				<div className='ml-7'>Email</div>
				<div>Full Name</div>
				<div className='mr-7'>Roles</div>
			</div>
			{users.map((e, i) => {
				const bg = (i % 2 === 0) ? 'bg-nav-blue' : '';
				return (
					<div key={e.email} className={'flex mt-4 h-12 items-center flex-wrap ' + bg}>
						<div className='min-w-[400px] pl-2 cursor-pointer hover:text-white'>{e.email}</div>
						<div className='ml-[180px] text-center min-w-[400px]'>{`${e.first_name} ${e.last_name}`}</div>
						<div className='min-w-[100px] text-center ml-[450px] pr-2'>{e.roles.toString()}</div>
					</div>
				)
			})}
		</div>
	);
};

export default AdminUsersContent;