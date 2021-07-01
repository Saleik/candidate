import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
/**
* Set up a decent box model on the root element
*/

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
}
body {
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
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
`;
