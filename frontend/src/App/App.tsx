import React from 'react';
import Footer from '../layout/footer';
import Header from '../layout/header';
import Main from '../layout/main';
import { GlobalStyle } from '../styles/globalStyles';

function App() {
	return (
		<>
			<GlobalStyle />
			<div className='App'>
				<Header />
				<Main />
				<Footer />
			</div>
		</>
	);
}

export default App;
