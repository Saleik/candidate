import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
export const GridContainer = styled.div``;
export const GlobalStyle = createGlobalStyle`
${normalize}
/**
* Set up a decent box model on the root element
*/

#root{
	height:100%;
}

* {
	max-width: 100%;
	position: relative;
}

*,
*::after,
*::before {
	box-sizing: border-box;
}

html,
body {
	margin: 0;
	padding: 0;
	font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
	font-family: Helvetica, sans-serif, sans-serif;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
		'   Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
		sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow-x: hidden;
}

body {
	height:100vh;
	background: #2980b9; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#ffffff,
		#6dd5fa,
		#2980b9
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#ffffff,
		#6dd5fa,
		#2980b9
	);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	${GridContainer}{
		display: grid;
		grid-template-areas:
			"header"
			"main"
			"footer";
		grid-template-columns: 100vw;
		grid-template-rows: min-content 1fr min-content;
		height: 100%;
	}
}
`;
