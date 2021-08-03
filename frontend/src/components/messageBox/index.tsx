import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
	type: 'success' | 'error' | 'warning';
	children: ReactNode;
	setToggle: () => void;
};

const MessageBox = ({ type, children, setToggle }: Props) => {
	return (
		<Container type={type}>
			<p>
				{children} <span onClick={() => setToggle()}>&#x2715;</span>
			</p>
		</Container>
	);
};

export default MessageBox;

MessageBox.DefaultProps = {
	type: 'warning',
};
type ContainerProps = {
	type: string;
};
const scaleInVerBottom = keyframes`
     0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }

  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    -webkit-transform-origin: 0% 100%;
            transform-origin: 0% 100%;
    opacity: 1;
  }
}
`;
const Container = styled.div<ContainerProps>`
	background-color: ${({ type }) =>
		type === 'success'
			? 'rgba(51, 204, 51, .5)'
			: type === 'error'
			? 'rgba(255, 80, 80, .5)'
			: 'rgb(255, 204, 0, .5'};
	border-radius: 0.5rem;
	text-align: center;
	color: #000;
	width: 100%;
	padding: 0 0.7rem;
	-webkit-animation: ${scaleInVerBottom} 0.5s
		cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
	animation: ${scaleInVerBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

	span {
		font-size: 1rem;
		:hover {
			color: #fff;
			cursor: pointer;
		}
	}
`;
