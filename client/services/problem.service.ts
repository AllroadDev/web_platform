import { AxiosInstance, AxiosResponse } from 'axios';
import { Problem, TCreateProblem, TUpdateProblem } from '../models/problem/problem.type';

export default class ProblemService {
	static readonly problemPrefix: string = '/problem';
	static axiosAuth: AxiosInstance;

	static async create(data: TCreateProblem): Promise<AxiosResponse<Problem>> {
		return this.axiosAuth.post(`${this.problemPrefix}`, data);
	}

	static async update(id: string, data: TUpdateProblem): Promise<AxiosResponse<Problem>> {
		return this.axiosAuth.patch(`${this.problemPrefix}/${id}`, data);
	}

	static async delete(id: string): Promise<AxiosResponse<Problem>> {
		return this.axiosAuth.delete(`${this.problemPrefix}/${id}`);
	}

	static async findMany(): Promise<AxiosResponse<Problem[]>> {
		return this.axiosAuth.get(`${this.problemPrefix}`);
	}

	static async findOne(id: string): Promise<AxiosResponse<Problem>> {
		return this.axiosAuth.get(`${this.problemPrefix}/${id}`);
	}
}
