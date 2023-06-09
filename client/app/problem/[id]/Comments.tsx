'use client';

import React, { FC, useEffect, useState } from 'react';
import useAxiosAuth from '../../../lib/hooks/useAxiosAuth';
import { TComment } from '../../../models/comment/comment.type';
import CommentService from '../../../services/comment.service';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface ICommentsProps {
	problemId: string
}

export type TActiveComment = {
	id: string;
	type: 'replying' | 'editing';
}

const Comments: FC<ICommentsProps> = ({ problemId }) => {
	const axiosAuth = useAxiosAuth();
	CommentService.axiosAuth = axiosAuth;

	const [backendComments, setBackendComments] = useState<TComment[]>([]);
	const [activeComment, setActiveComment] = useState<TActiveComment | null>(null);

	const addComment = (text: string) => {
		CommentService.create({ text, problemId }).then((res) => {
			setBackendComments([res.data, ...backendComments]);
		});
	}

	const deleteComment = (commentId: string) => {
		if (window.confirm('Are you sure?')) {
			CommentService.delete(commentId).then(() => {
				const updatedBackendComments = backendComments.filter(
					(backendComment) => backendComment.id !== commentId
				);
				setBackendComments(updatedBackendComments);
			}).catch(console.error);
		}
	}

	const updateComment = (text: string, commentId: string) => {
		CommentService.update(commentId, { text }).then(() => {
			const updatedBackendComments = backendComments.map(
				(backendComment) => {
					if (backendComment.id === commentId) {
						return { ...backendComment, text  }
					}
					return backendComment
				}
			);
			setBackendComments(updatedBackendComments);
			setActiveComment(null);
		}).catch(console.error);
	}


	useEffect(() => {
		CommentService.findMany(problemId).then((res) => {
			setBackendComments(res.data);
		}).catch(console.error);
	}, []);

	return (
		<div>
			<div className='p-1'>Write comment</div>
			<CommentForm 
				submitLabeL="Write" 
				handleSubmit={addComment} 
				initialText=''
				hasCancelButton={false}
				handleCancel={() => setActiveComment(null)}
				/>
			<div className='flex flex-col mt-4'>
				{backendComments.map((comment) => (
					<Comment 
						key={comment.id} 
						comment={comment} 
						updateComment={updateComment}
						deleteComment={deleteComment}
						activeComment={activeComment}
						setActiveComment={setActiveComment} 
					/>
				))
				}
			</div>
		</div>
	);
};

export default Comments;
