import { IError } from './../types';
import { AppThunk } from '../../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';
import endpoints from '../endpoints';
import { EditApply, StoreData } from './@types/types';

const initialState: EditApply = {
	isEdit: false,
	isLoading: false,
	error: {
		message: null,
	},
};

export const editSlice = createSlice({
	name: 'edit',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setEditSuccess: (state, { payload }: PayloadAction<boolean>) => {
			state.isEdit = payload;
		},
		setEditFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
		},
	},
});

export const { setLoading, setEditSuccess, setEditFailed } = editSlice.actions;

export const editSelector = (state: RootState) => state.applyEdit;

export const edit =
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
		id: string,
		token: string
	): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));

			await axios.put(
				endpoints.EDIT_APPLY_API,
				{
					id,
					reminder: date,
					corporation,
					email,
					position,
					city,
					techno: technologies,
					comment,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(setEditSuccess(true));
		} catch (error) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};

			dispatch(setEditFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export default editSlice.reducer;
