import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const BackButton = () => {
	const history = useHistory();
	return (
		<BackIconWrapper>
			<BackIcon type='button' onClick={() => history.goBack()}>
				&#8592;
			</BackIcon>
		</BackIconWrapper>
	);
};

export default BackButton;

const BackIconWrapper = styled.div`
	width: 100%;
	height: auto;
`;
const BackIcon = styled.button`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	border: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	background-color: #ffa31a;
	color: #000;
	cursor: pointer;
	transition: all 0.5s;
	@media screen and (min-width: 1024px) {
		:hover {
			background-color: #000;
			color: #ffa31a;
			transform: scale(1.1);
		}
	}
`;
