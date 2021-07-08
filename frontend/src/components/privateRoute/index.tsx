import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { authSelector } from '../../features/auth/authSlice';

type Props = {
	component: FunctionComponent<any>;
	exact?: boolean;
	path: string;
};
export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
	const { isAuth } = useSelector(authSelector);
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to='/signin' />
			}></Route>
	);
};
export default PrivateRoute;
