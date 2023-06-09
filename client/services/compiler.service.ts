import { AxiosInstance, AxiosResponse } from 'axios';
import { IResponseCompiler } from '../app/problem/[id]/compiler';
import { Problem } from '../models/problem/problem.type';

export const Language = {
	JS: 'js',
	PYTHON: 'py',
} as const;

export type TLanguage = (typeof Language)[keyof typeof Language];

export type CodeType = {
	type: 'Buffer';
	data: Array<number>;
};

export type CompilerDto = {
	lang: TLanguage;
	code: Buffer;
	problemId: string;
	submit: boolean;
};

export default class CompilerService {
	static readonly compilerPrefix: string = '/compiler';
	static axiosAuth: AxiosInstance;

	static async compile(data: CompilerDto): Promise<AxiosResponse<IResponseCompiler>> {
		return this.axiosAuth.post(`${this.compilerPrefix}`, data);
	}
}
