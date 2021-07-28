import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<Container>
			<p>
				<b>Copyright Kurios Digital &#169; </b>
			</p>
		</Container>
	);
};

export default Footer;

const Container = styled.footer`
	grid-area: footer;
	justify-self: center;
	align-self: end;
`;
