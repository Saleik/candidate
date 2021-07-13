import { AuthError, Data, RegisterData, RegisterState } from './../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import { ENDPOINT, setAuthSuccess } from '../auth/authSlice';

export const initialState: RegisterState = {
	isRegister: false,
	isLoading: false,
	error: { message: null },
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setRegisterSuccess: (state, { payload }: PayloadAction<boolean>) => {
			state.isRegister = true;
		},
		setRegisterFailed: (state, { payload }: PayloadAction<AuthError>) => {
			state.error = payload;
			state.isRegister = false;
		},
	},
});

export const { setRegisterFailed, setRegisterSuccess, setLoading } =
	registerSlice.actions;

export const registerSelector = (state: RootState) => state.register;

export const signUp =
	({ firstname, lastname, email, password }: RegisterData): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: Data = await axios.post(`${ENDPOINT}/user/register`, {
				firstname,
				lastname,
				email,
				password,
			});
			dispatch(setRegisterSuccess(true));
			dispatch(setAuthSuccess(data));
			localStorage.setItem('currentUser', JSON.stringify(data));
		} catch (error) {
			const errorMessage: AuthError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setRegisterFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export default registerSlice.reducer;
