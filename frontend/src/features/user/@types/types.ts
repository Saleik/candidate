import { IError } from './../../types';
import { CurrentUser } from '../../auth/@types/types';

export interface RegisterState {
	isRegister: boolean;
	isLoading: boolean;
	error: IError;
}

export interface RegisterData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}
export interface UserData {
	data: CurrentUser;
}
