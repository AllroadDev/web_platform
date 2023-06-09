'use client';

import React, { FC, useState } from 'react';

interface ICommentFormProps {
	submitLabeL: string;
	handleSubmit: (text: string) => void;
	hasCancelButton: boolean;
	initialText: string;
	handleCancel: () => void;
}

const CommentForm: FC<ICommentFormProps> = ({ 
	submitLabeL, 
	handleSubmit, 
	handleCancel, 
	hasCancelButton = false, 
	initialText = '' 
}) => {
	const [text, setText] = useState<string>(initialText);
	const isTextAreaDisabled = !text.length;

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(text);
		setText('');
	}

	return (
		<form className='flex flex-col' onSubmit={onSubmit}>
			<textarea 
				className='text-black'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<div className='flex justify-center'> 
				<button
					disabled={isTextAreaDisabled}
					className='bg-blue-500 hover:bg-blue-600 rounded py-1 px-3 ml-3 w-24 mt-2 self-center cursor-pointer'
				>
					{submitLabeL}
				</button>
				{hasCancelButton && (
					<button
						onClick={handleCancel}
						type='button'
						className='bg-red-500 hover:bg-red-600 rounded py-1 px-3 ml-3 w-24 mt-2 self-center cursor-pointer'
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};

export default CommentForm;