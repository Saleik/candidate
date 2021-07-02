import React from 'react';
import { Switch, Route } from 'react-router-dom';
//User
import Login from '../../views/login';

const Main = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Login />
			</Route>
		</Switch>
	);
};

export default Main;
