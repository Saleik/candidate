import React from 'react';
import styled from 'styled-components';
import Footer from '../layout/footer';
import Header from '../layout/header';
import Main from '../layout/main';
import { GlobalStyle } from '../styles/globalStyles';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
	return (
		<>
			<GlobalStyle />
			<Router>
				<PageContainer>
					<Header />
					<Container>
						<Main />
					</Container>
					<Footer />
				</PageContainer>
			</Router>
		</>
	);
}

export default App;

const PageContainer = styled.div`
	position: relative;
	min-height: 100vh;
	padding-bottom: 2.5rem;
`;

const Container = styled.main`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
