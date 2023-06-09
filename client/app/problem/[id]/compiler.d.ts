export enum Verdict {
	Accepted = 'Accepted',
	WrongAnswer = 'Wrong answer',
	Correct = 'Correct',
	Error = 'Error',
}

export interface IResponseCompiler {
	verdict: Verdict;
	logs: string;
	runTime: string | null;
}
