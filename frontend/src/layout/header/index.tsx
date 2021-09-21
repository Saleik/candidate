import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/button';
import { authSelector, logOut } from '../../features/auth/authSlice';
const Header = () => {
	const { currentUser } = useSelector(authSelector);
	return (
		<Container>
			<h1>
				<img src={logo} width='50' height='100' alt='logo' />
			</h1>
			<nav>
				<ul>
					<li>
						<h1>Candidate</h1>
					</li>
					<li>
						<q>
							<i>Manage your apply</i>
						</q>
					</li>
				</ul>
			</nav>
			{currentUser?.token && (
				<Button type='button' onClick={logOut}>
					Log Out
				</Button>
			)}
		</Container>
	);
};

export default Header;

const Container = styled.header`
	grid-area: header;
	justify-self: center;
	width: 960px;
	max-width: 100%;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;

	h1 {
		margin: 0;
	}

	nav {
		ul {
			text-align: center;
			display: flex;
			li {
				display: inline;
				padding: 0 0.5rem;
			}
		}
	}

	@media (min-width: 960px) {
		justify-content: space-between;
	}
`;
