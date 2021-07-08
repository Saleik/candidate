import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
const ENDPOINT = 'http://localhost:5000/api';
export interface AuthError {
	message: string | null;
}

export interface AuthState {
	isAuth: boolean;
	currentUser?: CurrentUser;
	isLoading: boolean;
	error: AuthError;
}

export interface CurrentUser {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	token: string;
}

export const initialState: AuthState = {
	isAuth: localStorage.getItem('currentUser') ? true : false,
	currentUser: localStorage.getItem('currentUser')
		? JSON.parse(localStorage.getItem('currentUser')!)
		: null,
	isLoading: false,
	error: { message: null },
};

interface Data {
	data: CurrentUser;
}
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setAuthSuccess: (state, { payload }: PayloadAction<CurrentUser>) => {
			state.currentUser = payload;
			state.isAuth = true;
		},
		setLogOut: (state) => {
			state.isAuth = false;
			state.currentUser = undefined;
		},
		setAuthFailed: (state, { payload }: PayloadAction<AuthError>) => {
			state.error = payload;
			state.isAuth = false;
		},
	},
});

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed } =
	authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const login =
	(email: string, password: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: Data = await axios.post(`${ENDPOINT}/user/signin`, {
				email,
				password,
			});
			dispatch(setAuthSuccess(data));
			localStorage.setItem('currentUser', JSON.stringify(data));
		} catch (error) {
			const errorMessage: AuthError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setAuthFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export const logOut = (): AppThunk => (dispatch) => {
	localStorage.removeItem('currentUser');
	window.location.href = '/signin';
	dispatch(setLogOut());
};
export default authSlice.reducer;
