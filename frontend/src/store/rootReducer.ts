import registerApplySlice from '../features/apply/registerApplySlice';
import getAllSlice from './../features/apply/getAllSlice';
import registerSlice from '../features/user/registerSlice';
import authSlice from './../features/auth/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import store from './store';

const rootReducer = combineReducers({
	auth: authSlice,
	userRegister: registerSlice,
	applies: getAllSlice,
	applyRegister: registerApplySlice,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
