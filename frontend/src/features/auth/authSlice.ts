import { IError } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import { AuthState, CurrentUser } from './@types/types';
import endpoints from '../endpoints';
import { UserData } from '../user/@types/types';
import { IValues } from '../../hooks/useForm';

const initialState: AuthState = {
	isAuth: localStorage.getItem('currentUser') ? true : false,
	currentUser: localStorage.getItem('currentUser')
		? JSON.parse(localStorage.getItem('currentUser')!)
		: null,
	isLoading: false,
	error: { message: null },
};

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
		setAuthFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
			state.isAuth = false;
		},
	},
});

export const { setAuthSuccess, setLogOut, setLoading, setAuthFailed } =
	authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export const signin =
	({ email, password }: IValues): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: UserData = await axios.post(`${endpoints.AUTH_API}`, {
				email,
				password,
			});
			dispatch(setAuthSuccess(data));
			localStorage.setItem('currentUser', JSON.stringify(data));
		} catch (error: any) {
			const errorMessage: IError = {
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
