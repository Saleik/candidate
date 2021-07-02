import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import { Dispatch } from 'redux';
import { IData } from '../../@types/user/userTypes';

type SigninAction = {
	type:
		| typeof USER_SIGNIN_REQUEST
		| typeof USER_SIGNIN_SUCCESS
		| typeof USER_SIGNIN_FAIL;
};

export const signin =
	(email: string, password: string) =>
	async (dispatch: Dispatch<SigninAction>) => {
		dispatch({
			type: USER_SIGNIN_REQUEST,
			payload: {
				email,
				password,
			},
		});

		try {
			const { data }: IData = await axios.post('/api/user/signin', {
				email,
				password,
			});

			dispatch({
				type: USER_SIGNIN_SUCCESS,
				payload: data,
			});

			localStorage.setItem('userData', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: USER_SIGNIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
