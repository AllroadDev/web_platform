export enum Difficulty {
	Easy = 'Easy',
	Medium = 'Medium',
	Hard = 'Hard'
}

export interface Problem {
	id: number;
	title: string;
	description: string;
	difficulty: ProblemDifficulty;
	solution: string;
	constraints: string[];
	createdAt: Date;
	updatedAt: Date;
	inputs: object;
	outputs: object;
}