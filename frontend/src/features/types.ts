export interface AuthError {
	message: string | null;
}

export interface AuthState {
	isAuth: boolean;
	currentUser?: CurrentUser;
	isLoading: boolean;
	error: AuthError;
}

export interface RegisterState {
	isRegister: boolean;
	isLoading: boolean;
	error: AuthError;
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

export interface Data {
	data: CurrentUser;
}
