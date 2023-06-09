import { AxiosInstance, AxiosResponse } from 'axios';
import { TComment, TCreateComment, TUpdateComment } from '../models/comment/comment.type';
import { Problem, TCreateProblem, TUpdateProblem } from '../models/problem/problem.type';

export default class CommentService {
	static readonly commentPrefix: string = '/comment';
	static axiosAuth: AxiosInstance;

	static async create(data: TCreateComment): Promise<AxiosResponse<TComment>> {
		return this.axiosAuth.post(`${this.commentPrefix}`, data);
	}

	static async update(id: string, data: TUpdateComment): Promise<AxiosResponse<TComment>> {
		return this.axiosAuth.patch(`${this.commentPrefix}/${id}`, data);
	}

	static async delete(id: string): Promise<AxiosResponse<void>> {
		return this.axiosAuth.delete(`${this.commentPrefix}/${id}`);
	}

	static async findMany(problem_id: string): Promise<AxiosResponse<TComment[]>> {
		return this.axiosAuth.get(`${this.commentPrefix}?problem_id=${problem_id}`);
	}
}
