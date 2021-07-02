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
	height: 2.5rem;
	position: absolute;
	bottom: 0;
	width: 100%;
	text-align: center;
`;
