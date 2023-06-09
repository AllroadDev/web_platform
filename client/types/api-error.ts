export type TApiError = {
	statusCode: number;
	message: string;
	additionalInfo: string;
	method: string;
	path: string;
	timestamp: string;
};
