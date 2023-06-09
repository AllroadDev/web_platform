import { Problem } from '../problem/problem.type';
import { TUserResponse } from '../user/user.type';

export type TComment = {
	id: string;
	text: string;
	thumbs_up: number;
	thumbs_down: number;
	user: TUserResponse;
	problem: Problem;
	created_at: Date;
	updated_at: Date;
};

export type TCreateComment = {
	text: string;
	problemId: string;
};

export type TUpdateComment = {
	text: string;
};
