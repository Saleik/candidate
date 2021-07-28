import React from 'react';
import styled from 'styled-components';
import Footer from '../layout/footer';
import Header from '../layout/header';
import Main from '../layout/main';
import { GlobalStyle, GridContainer } from '../styles/globalStyles';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
	return (
		<>
			<GlobalStyle />
			<Router>
				<GridContainer>
					<Header />
					<Main />
					<Footer />
				</GridContainer>
			</Router>
		</>
	);
}

export default App;
