import { IError } from '../types';
import endpoints from '../endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import { DelApply } from './@types/types';

const initialState: DelApply = {
	success: false,
	isLoading: false,
	error: {
		message: null,
	},
};

export const deleteSlice = createSlice({
	name: 'delete',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setDeleteSuccess: (state, { payload }: PayloadAction<boolean>) => {
			state.success = payload;
		},
		setDeleteFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
		},
	},
});

export const { setLoading, setDeleteSuccess, setDeleteFailed } =
	deleteSlice.actions;

export const deleteSelector = (state: RootState) => state.applyDelete;

export const del =
	(token: string, _id: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));

			await axios.delete(
				`${endpoints.SERVER_API + endpoints.DELETE_APPLY_API}`,
				{
					data: {
						_id: _id,
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(setDeleteSuccess(true));
		} catch (error: any) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setDeleteFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export default deleteSlice.reducer;
