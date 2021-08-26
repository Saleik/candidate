import React, { ReactChild } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Btn } from '../button';
type Props = {
	children: ReactChild;
	deleteTrue: () => void;
	deleteFalse: () => void;
};
const Modal = ({ children, deleteTrue, deleteFalse }: Props) => {
	return ReactDOM.createPortal(
		<>
			<Overlay />
			<Wrapper>
				<div>
					<span>
						<b>{children}</b>
					</span>
				</div>
				<Btn type='button' onClick={() => deleteTrue()}>
					Yes
				</Btn>{' '}
				<Btn type='button' onClick={() => deleteFalse()}>
					No
				</Btn>
			</Wrapper>
		</>,
		document.getElementById('portal')!
	);
};

export default Modal;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
`;
const Wrapper = styled.div`
	text-align: center;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 200;
	color: #fff;
	width: 20rem;
	border-radius: 0.5rem;
	border: 1px solid #e6e6e6;
	padding: 1rem;
	background-color: #348cc3;
`;
