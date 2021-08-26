import { UserData, RegisterState } from './@types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import { setAuthSuccess } from '../auth/authSlice';
import endpoints from '../endpoints';
import { IError } from '../types';
import { IValues } from '../../hooks/useForm';

const initialState: RegisterState = {
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
		setRegisterFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
			state.isRegister = false;
		},
	},
});

export const { setRegisterFailed, setRegisterSuccess, setLoading } =
	registerSlice.actions;

export const registerSelector = (state: RootState) => state.userRegister;

export const signUp =
	({ firstname, lastname, email, password }: IValues): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: UserData = await axios.post(
				`${endpoints.REGISTER_USER_API}`,
				{
					firstname,
					lastname,
					email,
					password,
				}
			);
			dispatch(setRegisterSuccess(true));
			dispatch(setAuthSuccess(data));
			localStorage.setItem('currentUser', JSON.stringify(data));
		} catch (error) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setRegisterFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export default registerSlice.reducer;
