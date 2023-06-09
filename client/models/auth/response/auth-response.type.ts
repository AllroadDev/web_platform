import { TUser, TUserResponse, TUserRole } from '../../user/user.type';

export type TTokens = {
	accessToken: string;
	refreshToken: string;
};

export type TJwtPayload = {
	sub: string;
	email: string;
	roles: TUserRole[];
	isEmailConfirmed: boolean;
};

export type TAuthResponse = {
	user: TUserResponse; // | TUser
	tokens: TTokens;
};
