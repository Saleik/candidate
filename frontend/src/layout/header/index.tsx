import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import Button from '../../components/button';
const Header = () => {
	return (
		<header>
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
								<i>Management your apply</i>
							</q>
						</li>
					</ul>
				</nav>
				<Button>Disconnected</Button>
			</Container>
		</header>
	);
};

export default Header;

const Container = styled.div`
	width: 960px;
	max-width: 100%;
	padding: 1rem;
	margin: 0 auto;
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
