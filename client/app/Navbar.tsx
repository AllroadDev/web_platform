'use client'

import { FC } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type TLinks = { name: string, path: string; }[];

const mainContentLinks: TLinks = [
	{ name: 'Problems', path: '/problem' },
	{ name: 'About', path: '/about' },
];

const authLinks: TLinks = [
	{ name: 'SignIn', path: '/auth/signin' },
	{ name: 'SignUp', path: '/auth/signup' },
];

const Navbar: FC = () => {
	const { data: session } = useSession();

	return (
		<header className='bg-nav-blue h-14 w-full'>
			<nav className='container mx-auto flex text-slate-300 justify-between h-full items-center'>
				<div className='flex'>
					<div className='mr-16 font-semibold text-white'><Link href='/'>Mastercode</Link></div>
					<div className='flex list-none'>
						<div className='flex'>
							{
								mainContentLinks.map((link) => (
									<li key={link.name} className='mr-4 hover:text-white'>
										{
										!session?.user
										?
										link.name !== 'Problems' ? <Link href={link.path}>{link.name}</Link> : <></>
										:
										<Link href={link.path}>{link.name}</Link>
										}
									</li>
								))
							}
						</div>
						<div className='flex ml-[330%]'>
							{
								session?.user?.roles.includes('admin')
								?
								<li key={'admin'} className='hover:text-white ml-20'>
									<Link href={'/admin'}>Admin</Link>
								</li>
								:
								<></>
							}
							{
								session?.user
								?
								<li key={'profile'} className='ml-4 hover:text-white'>
									<Link href={'/profile/' + session?.user?.id}>Profile</Link>
								</li>
								:
								<div className='flex ml-24'>
								{	
									authLinks.map((link) => (
										<li key={link.name} className='mr-4	 hover:text-white'>
											<Link href={link.path}>{link.name}</Link>
										</li>
									))
								}
								</div>
							}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;