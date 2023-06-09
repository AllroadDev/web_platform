import { AxiosInstance, AxiosResponse } from 'axios';
import { TAvatarResponse, TUpdateUser, TUserResponse } from '../models/user/user.type';

export default class UserService {
	static readonly userPrefix: string = '/user';
	static axiosAuth: AxiosInstance;

	static async findOne(userId?: string): Promise<AxiosResponse<TUserResponse>> {
		return this.axiosAuth.get(`${this.userPrefix}/${userId}`);
	}

	static async update(data: TUpdateUser, userId?: string): Promise<AxiosResponse<TUserResponse>> {
		return this.axiosAuth.patch(`${this.userPrefix}/${userId}`, data);
	}

	static async findMany(): Promise<AxiosResponse<TUserResponse[]>> {
		return this.axiosAuth.get(`${this.userPrefix}`);
	}

	static async uploadAvatar(data): Promise<AxiosResponse<TAvatarResponse>> {
		return this.axiosAuth.post(`${this.userPrefix}/avatar`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}
}
