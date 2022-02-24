import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
//User
import Signin from '../../views/Signin';
import Register from '../../views/Register';

//Private
import PrivateRoute from '../../components/privateRoute';
import Homepage from '../../views/Homepage';

//Apply
import EditOrStore from '../../middleware/EditOrStore';

const Main = () => {
	return (
		<Container>
			<Switch>
				{/* Authenticate Only  */}
				<PrivateRoute path='/applies' component={Homepage} />
				<PrivateRoute path='/add/apply' component={EditOrStore} />
				<PrivateRoute path='/update/apply/:id' component={EditOrStore} />

				{/* User */}
				<Route exact path='/' component={Signin} />
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
	width: 100%;
	position: relative;

	@media screen and (min-width: 1024px) {
		width: 50vw;
	}
`;
export default Main;
