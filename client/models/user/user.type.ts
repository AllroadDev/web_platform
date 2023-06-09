export const UserRole = {
	USER: 'user',
	ADMIN: 'admin',
} as const;

export type TUserRole = (typeof UserRole)[keyof typeof UserRole];

export type TUser = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password_hash?: string | null;
	avatar?: File | null;
	avatar_id?: string | null;
	additional_info?: string | null;
	roles: TUserRole[];
	comments: Comment[];
	is_email_confirmed: boolean;
	// password_reset_tokens: PasswordResetToken[];
	google_id?: string | null;
	// problems_reactions: ProblemReaction[];
	// solved_problems: UserSolvedProblem[];
	created_at: Date;
	updated_at: Date;
	refresh_token_hash?: string | null;
};

export type TUserResponse = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	avatar?: File | null;
	additional_info?: string | null;
	roles: TUserRole[];
	comments: Comment[];
	is_email_confirmed: boolean;
	// solved_problems: UserSolvedProblem[];
	// password_reset_tokens: PasswordResetToken[];
	// problems_reactions: ProblemReaction[];
	created_at: Date;
	updated_at: Date;
};

export type TAvatarResponse = {
	id: string;
	filename: string;
	mimetype: string;
};

export type TUpdateUser = {
	first_name?: string;
	last_name?: string;
	additional_info?: string;
};
