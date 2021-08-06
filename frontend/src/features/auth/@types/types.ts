import { IError } from '../../types';

export interface AuthState {
	isAuth: boolean;
	currentUser?: CurrentUser;
	isLoading: boolean;
	error: IError;
}

export interface CurrentUser {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	token: string;
}
