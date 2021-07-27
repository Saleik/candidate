import { Applies, AppliesData, GetApplies, IError } from './../types';
import endpoints from '../endpoints';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store/store';
import { RootState } from '../../store/rootReducer';
import axios from 'axios';

export const initialState: GetApplies = {
	applies: null,
	isLoading: false,
	error: { message: null },
};

export const getAllSlice = createSlice({
	name: 'getAll',
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoading = payload;
		},
		setGetAllSuccess: (state, { payload }: PayloadAction<Applies[]>) => {
			state.applies = payload;
		},
		setGetAllFailed: (state, { payload }: PayloadAction<IError>) => {
			state.error = payload;
		},
	},
});

export const { setLoading, setGetAllSuccess, setGetAllFailed } =
	getAllSlice.actions;

export const getAllSelector = (state: RootState) => state.applies;

export const fetchAll =
	(userId: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(setLoading(true));
			const { data }: AppliesData = await axios.get(
				`${endpoints.GET_ALL_APPLIES_API}`,
				{
					params: {
						userId: userId,
					},
				}
			);
			dispatch(setGetAllSuccess(data));
		} catch (error) {
			const errorMessage: IError = {
				message: error.response?.data.message || error.message,
			};
			dispatch(setGetAllFailed(errorMessage));
		} finally {
			dispatch(setLoading(false));
		}
	};

export default getAllSlice.reducer;
