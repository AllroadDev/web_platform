import { FC } from 'react';

interface ManagePanel {
	children?: React.ReactNode,
}

const ManagePanel: FC<ManagePanel> = ({ children }) => {
	return (
		<div className='flex h-11 bg-command-blue border-b border-t items-center border-nav-blue'>
			{children}
		</div>
	);
};

export default ManagePanel;