import registerSlice from './../features/register/registerSlice';
import authSlice from './../features/auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import store from './store';

const rootReducer = combineReducers({
	auth: authSlice,
	register: registerSlice,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
