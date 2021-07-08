import React from 'react';
import { Switch, Route } from 'react-router-dom';
//User
import Login from '../../views/login';
import Homepage from '../../views/homepage';
import PrivateRoute from '../../components/privateRoute';
import Register from '../../views/register';

const Main = () => {
	return (
		<Switch>
			{/* Authenticate Only  */}
			<PrivateRoute exact path='/' component={Homepage} />

			{/* User */}
			<Route path='/signin' component={Login} />
			<Route path='/register' component={Register} />
		</Switch>
	);
};

export default Main;
