export interface IError {
	message: string | null;
}

export interface AuthState {
	isAuth: boolean;
	currentUser?: CurrentUser;
	isLoading: boolean;
	error: IError;
}

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
export interface CurrentUser {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	token: string;
}

export interface UserData {
	data: CurrentUser;
}

export type Applies = {
	corporation: string;
	position: string;
	techno: string;
	comment: string;
	city: string;
	firstApply: Date;
	revival: Date;
	updateAt: Date;
};
export interface GetApplies {
	applies: null | Applies[];
	isLoading: boolean;
	error: IError;
}
export interface AppliesData {
	data: Applies[];
}
