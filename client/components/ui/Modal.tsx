import { FC } from 'react';

interface IModalProps {
	children: React.ReactNode;
	visible: boolean;
	setVisible: Function;
}

const modalDefaulStyles = 'fixed top-0 bottom-0 right-0 left-0 bg-black/50'; 
const modalActiveStyles = 'flex justify-center items-center';

const Modal: FC<IModalProps> = ({ children, visible, setVisible }) => {

	const modalStyles = 
		visible 
		? [modalDefaulStyles, modalActiveStyles].join(' ') : modalDefaulStyles + ' hidden'; 

	return (
		<div 
			onClick={() => setVisible(false)}
			className={modalStyles}>
			<div 
				onClick={(e) => e.stopPropagation()}
				className='p-7 bg-white border rounded-xl min-w-[250px]'>
				{children}
			</div>
		</div>
	);
};

export default Modal;