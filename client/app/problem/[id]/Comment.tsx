/* eslint-disable @next/next/no-img-element */
'use client';

import { useSession } from 'next-auth/react';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { TComment } from '../../../models/comment/comment.type';
import CommentForm from './CommentForm';
import { TActiveComment } from './Comments';

interface ICommentProps {
	comment: TComment;
	deleteComment: (id: string) => void;
	activeComment: any;
	setActiveComment: Dispatch<SetStateAction<TActiveComment | null>>;
	updateComment: (text: string, commentId: string) => void;
}	

const Comment: FC<ICommentProps> = ({ comment, deleteComment, activeComment, setActiveComment, updateComment }) => {
	const { data: session } = useSession();
	const canManage = session?.user.id === comment.user.id;
	const createdAt = new Date(comment.created_at).toLocaleDateString(); 
	const isEditing = 
		activeComment &&
		activeComment.type === 'editing' &&
		activeComment.id === comment.id;

	return (
		<div className='flex mt-6'>
			<div>
				<img className='rounded-[50%]' src='/user-icon.png' alt='user-icon' />
			</div>
			<div className='ml-3'>
				<div className='flex'>
					<div>{comment.user.first_name} {comment.user.last_name}</div>
					<div className='ml-4'>{createdAt}</div>
				</div>
				{!isEditing && <div>{comment.text}</div>}
				{isEditing && (
					<CommentForm 
						submitLabeL='Update' 
						hasCancelButton 
						initialText={comment.text} 
						handleSubmit={(text: string) => updateComment(text, comment.id)}
						handleCancel={() => setActiveComment(null)}
					/>
				)}
				<div className='flex mt-2 text-xs'>
					{canManage && (
						<div
							onClick={() => setActiveComment({ id: comment.id, type: 'editing' })} 
							className='cursor-pointer hover:text-slate-200'>
							Edit
						</div>
					)}
					{canManage && (
						<div 
							className='ml-2 cursor-pointer hover:text-slate-200'
							onClick={() => deleteComment(comment.id)}
							>
							Delete
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;