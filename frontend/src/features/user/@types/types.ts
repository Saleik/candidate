import { IError } from './../../types';
import { CurrentUser } from '../../auth/@types/types';

export interface RegisterState {
	isRegister: boolean;
	isLoading: boolean;
	error: IError;
}

export interface UserData {
	data: CurrentUser;
}
