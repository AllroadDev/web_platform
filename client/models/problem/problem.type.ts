import { Category } from '../category/category.types';

export const ProblemDifficulty = {
	EASY: 'easy',
	MEDIUM: 'medium',
	HARD: 'hard',
} as const;

export type TProblemDifficulty = (typeof ProblemDifficulty)[keyof typeof ProblemDifficulty];

export type Problem = {
	id: string;
	title: string;
	description: string;
	difficulty: TProblemDifficulty;
	solution: string;
	likes: number;
	dislikes: number;
	constraints: string[];
	inputs: Record<string, any[]>;
	outputs: Record<string, any[]>;
	category: Category;
	comments: Comment[];
	// users: User[];
	// problems_reactions: ProblemReaction[];
	// solved_problems: UserSolvedProblem[];
	created_at: Date;
	updated_at: Date;
};

export type TCreateProblem = {
	title: string;
	description: string;
	difficulty: TProblemDifficulty;
	solution: string;
	constraints: string[];
	category_id: number;
	inputs: Record<string, any[]>;
	outputs: Record<string, any[]>;
};

export type TUpdateProblem = {
	title?: string;
	description?: string;
	difficulty?: TProblemDifficulty;
	solution?: string;
	constraints?: string[];
	category_id?: string;
	inputs?: Record<string, any[]>;
	outputs?: Record<string, any[]>;
};

export type TUpdateProblemClientForm = {
	title?: string;
	description?: string;
	difficulty?: TProblemDifficulty;
	solution?: string;
	constraints?: string;
	category_id?: string;
	inputs?: string;
	outputs?: string;
};
