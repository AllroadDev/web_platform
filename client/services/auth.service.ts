import $api from '../http';
import { AxiosInstance, AxiosResponse } from 'axios';
import { TAuthResponse } from '../models/auth/response/auth-response.type';
import { TSigninLocal, TSignupLocal } from '../models/auth/request/auth-request.type';
import { TApiError } from '../types/api-error';

export default class AuthService {
	static readonly authPrefix: string = '/auth';
	static axiosAuth: AxiosInstance;

	static async signupLocal(data: TSignupLocal): Promise<AxiosResponse<TAuthResponse>> {
		return this.axiosAuth.post(`${this.authPrefix}/local/signup`, data);
	}

	// static async signinLocal(data: TSigninLocal): Promise<AxiosResponse<TAuthResponse>> {
	// 	return $api.post<TAuthResponse>(`${this.authPrefix}/local/signin`, data);
	// }

	// static async logout(): Promise<void> {
	// 	return $api.post(`${this.authPrefix}/logout`);
	// }
}
