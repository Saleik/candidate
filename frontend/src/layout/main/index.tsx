import React from 'react';
import { Switch, Route } from 'react-router-dom';
//User
import Login from '../../views/login';
import Homepage from '../../views/homepage';
import PrivateRoute from '../../components/privateRoute';
import Register from '../../views/register';
import styled from 'styled-components';

const Main = () => {
	return (
		<Container>
			<Switch>
				{/* Authenticate Only  */}
				<PrivateRoute exact path='/' component={Homepage} />

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
