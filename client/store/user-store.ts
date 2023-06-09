import { TUserResponse } from '../models/user/user.type';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/auth.service';
import axios from 'axios';
import { TAuthResponse } from '../models/auth/response/auth-response.type';
import { API_URL } from '../http';
import { TSigninLocal, TSignupLocal } from '../models/auth/request/auth-request.type';

export default class UserStore {
	user = {} as TUserResponse;
	isAuth = false;
	isLoading = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: TUserResponse) {
		this.user = user;
	}

	setLoading(bool: boolean) {
		this.isLoading = bool;
	}

	async signupLocal(data: TSignupLocal) {
		try {
			const response = await AuthService.signupLocal(data);
			console.log(response);
			localStorage.setItem('token', response.data.tokens.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e);
		}
	}

	async signinLocal(data: TSigninLocal) {
		try {
			const response = await AuthService.signinLocal(data);
			console.log(response);
			localStorage.setItem('token', response.data.tokens.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e);
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout();
			localStorage.removeItem('token');
			this.setAuth(false);
			this.setUser({} as TUserResponse);
		} catch (e) {
			console.log(e);
		}
	}

	async checkAuth() {
		this.setLoading(true);
		try {
			const response = await axios.get<TAuthResponse>(`${API_URL}/refresh`, {
				withCredentials: true,
			});
			console.log(response);
			localStorage.setItem('token', response.data.tokens.accessToken);
			this.setAuth(true);
			this.setUser(response.data.user);
		} catch (e) {
			console.log(e);
		} finally {
			this.setLoading(false);
		}
	}
}
