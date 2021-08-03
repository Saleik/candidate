import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
//User
import Login from '../../views/Login';
import Register from '../../views/Register';

//Private
import PrivateRoute from '../../components/privateRoute';
import Homepage from '../../views/Homepage';

//Apply
import NewApply from '../../views/NewApply';

const Main = () => {
	return (
		<Container>
			<Switch>
				{/* Authenticate Only  */}
				<PrivateRoute exact path='/' component={Homepage} />
				<PrivateRoute path='/add/apply' component={NewApply} />

				{/* User */}
				<Route path='/signin' component={Login} />
				<Route path='/register' component={Register} />
			</Switch>
		</Container>
	);
};

const Container = styled.main`
	grid-area: main;
	padding: 0 1rem;
	justify-self: center;
	align-self: center;
`;
export default Main;
