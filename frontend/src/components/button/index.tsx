import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { AppThunk } from '../../store/store';
type ButtonProps = {
	children: ReactNode;
	type: 'button' | 'submit' | 'reset';
	onClick?: () => AppThunk;
};
const Button = ({ children, type, onClick }: ButtonProps) => {
	return (
		<Btn onClick={onClick} type={type}>
			{children}
		</Btn>
	);
};

export default Button;

Button.defaultProps = {
	type: 'button',
};

const Btn = styled.button`
	background-color: #ffa31a;
	border-radius: 1rem;
	border: 0;
	cursor: pointer;
	padding: 0.25rem;
	color: #000;
	max-width: 5rem;
	width: 100%;
	font-size: 0.6rem;
	@media screen and (min-width: 1024px) {
		:hover {
			background-color: #000;
			color: #ffa31a;
			transform: scale(1.1);
			transition: 0.5s;
		}
	}
`;
