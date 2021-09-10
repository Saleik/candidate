import { ApplyData, Apply, GetApply } from './@types/types';
import { IError } from '../types';
import endpoints from '../endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';

const initialState: GetApply = {
	apply: null,
	isLoading: false,
	error: { message: null },
};

export const getByIdSlice = createSlice({
	name: 'getById',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setGetByIdSuccess: (state, { payload }: PayloadAction<Apply>) => {
			state.apply = payload;
		},
		setGetByIdFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
		},
		setGetByIdReset: (state, { payload }: PayloadAction) => {
			state.apply = null;
		},
	},
});

export const {
	setLoading,
	setGetByIdSuccess,
	setGetByIdFailed,
	setGetByIdReset,
} = getByIdSlice.actions;

export const getByIdSelector = (state: RootState) => state.apply;

export const fetchById =
	(id: string, token: string): AppThunk =>
	async (dispatch) => {
		try {
			setLoading(true);
			const { data }: ApplyData = await axios.get(
				`${endpoints.GET_BY_ID_APPLY_API}/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(setGetByIdSuccess(data));
		} catch (error) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			setGetByIdFailed(errorMessage);
		} finally {
			setLoading(false);
		}
	};
export default getByIdSlice.reducer;
