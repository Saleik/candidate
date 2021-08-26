import storeSlice from '../features/apply/storeSlice';
import getAllSlice from './../features/apply/getAllSlice';
import registerSlice from '../features/user/registerSlice';
import authSlice from './../features/auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import store from './store';
import deleteSlice from '../features/apply/deleteSlice';

const rootReducer = combineReducers({
	auth: authSlice,
	userRegister: registerSlice,
	applies: getAllSlice,
	applyStore: storeSlice,
	applyDelete: deleteSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
