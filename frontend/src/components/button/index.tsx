import React, { Children, ReactChild, ReactNode } from 'react';
import styled from 'styled-components';
type ButtonProps = {
	children: ReactNode;
	type: 'button' | 'submit' | 'reset';
};
const Button = ({ children, type }: ButtonProps) => {
	return <Btn type={type}>{children}</Btn>;
};

export default Button;

const Btn = styled.button`
	background-color: #ffa31a;
	border-radius: 1rem;
	border: 0;
	padding: 0.25rem;
	color: #000;
	cursor: pointer;
	transition: 0.5s;
	max-width: 5rem;
	width: 100%;
	font-size: 0.6rem;

	:hover {
		background-color: #000;
		color: #ffa31a;
		transform: scale(1.1);
	}
`;
