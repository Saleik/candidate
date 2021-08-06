import { AppThunk } from './../../store/store';
import { IError } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import endpoints from '../endpoints';
import { RegisterState, DataResponse, StoreData } from './@types/types';

export const initialState: RegisterState = {
	isRegister: false,
	corporation: null,
	isLoading: false,
	error: { message: null },
};

export const registerApplySlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setRegisterSuccess: (state, { payload }: PayloadAction<string>) => {
			state.isRegister = true;
			state.corporation = payload;
		},
		setRegisterFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
			state.isRegister = false;
		},
	},
});

export const { setRegisterFailed, setRegisterSuccess, setLoading } =
	registerApplySlice.actions;

export const registerSelector = (state: RootState) => state.applyRegister;

export const store =
	({
		dateOfRecall,
		corporation,
		email,
		position,
		city,
		technologies,
		comment,
		userId,
	}: StoreData): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: DataResponse = await axios.post(
				`${endpoints.REGISTER_APPLY_API}`,
				{
					dateOfRecall,
					corporation,
					email,
					position,
					city,
					technologies,
					comment,
					userId,
				}
			);

			dispatch(setRegisterSuccess(data.corporation));
		} catch (error) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setRegisterFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};
export default registerApplySlice.reducer;
