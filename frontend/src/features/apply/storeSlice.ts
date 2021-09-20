import { AppThunk } from '../../store/store';
import { IError } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import endpoints from '../endpoints';
import { storeState, StoreData } from './@types/types';

const initialState: storeState = {
	isStore: false,
	isLoading: false,
	error: { message: null },
};

export const storeApplySlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setStoreSuccess: (state) => {
			state.isStore = true;
		},
		setStoreFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
			state.isStore = false;
		},
		setStoreReset: (state) => {
			state.isStore = false;
			state.error.message = null;
		},
	},
});

export const { setStoreReset, setStoreFailed, setStoreSuccess, setLoading } =
	storeApplySlice.actions;

export const storeSelector = (state: RootState) => state.applyStore;

export const store =
	(
		{
			date,
			corporation,
			email,
			position,
			city,
			technologies,
			comment,
		}: StoreData,
		userId: string,
		token: string
	): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			await axios.post(
				`${endpoints.REGISTER_APPLY_API}`,
				{
					reminder: date,
					corporation,
					email,
					position,
					city,
					techno: technologies,
					comment,
					userId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(setStoreSuccess());
		} catch (error: any) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setStoreFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};
export default storeApplySlice.reducer;
