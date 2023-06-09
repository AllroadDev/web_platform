import { AxiosInstance, AxiosResponse } from 'axios';
import { TApiError } from '../types/api-error';

type TConfirmEmail = {
	token: string;
};

export default class EmailService {
	static readonly emailPrefix: string = '/email-confirmation';
	static axiosAuth: AxiosInstance;

	static async confirmEmail(data: TConfirmEmail): Promise<AxiosResponse<undefined>> {
		return this.axiosAuth.post(`${this.emailPrefix}/confirm`, data);
	}
}
