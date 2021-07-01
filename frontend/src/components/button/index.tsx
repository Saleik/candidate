import React, { Children, ReactChild, ReactNode } from 'react';
import styled from 'styled-components';
type Props = {
	children: ReactNode;
};
const Button = ({ children }: Props) => {
	return <Btn>{children}</Btn>;
};

export default Button;

const Btn = styled.button`
	background-color: #ffa31a;
	border-radius: 1rem;
	border: 0;
	padding: 0.5rem;
	color: #fff;
	cursor: pointer;
	transition: 0.5s;

	:hover {
		background-color: #fff;
		color: #ffa31a;
		transform: scale(1.1);
	}
`;
