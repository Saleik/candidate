import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/card';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import Modal from '../components/modal';
import { del, deleteSelector } from '../features/apply/deleteSlice';
import { fetchAll, getAllSelector } from '../features/apply/getAllSlice';
import { authSelector } from '../features/auth/authSlice';

export interface IModal {
	show: boolean;
	id: string | null;
}

const Homepage = () => {
	const { currentUser } = useSelector(authSelector);
	const { applies, isLoading, error } = useSelector(getAllSelector);
	const { isLoading: delLoading, error: delErr } = useSelector(deleteSelector);

	const [modal, setModal] = useState<IModal>({
		show: false,
		id: null,
	});

	const dispatch = useDispatch();

	const handleDeleteTrue = () => {
		if (modal.show && modal.id) {
			const deleteApply = applies?.filter((apply) => apply._id === modal.id);

			if (deleteApply && currentUser?.token) {
				const id = deleteApply[0]._id;
				dispatch(del(currentUser.token, id));
				setModal({ show: false, id: null });
			}
		}
	};

	const handleDeleteFalse = () => {
		setModal({
			show: false,
			id: null,
		});
	};

	useEffect(() => {
		(async () => {
			dispatch(fetchAll(currentUser?._id!));
		})();
	}, [currentUser, error.message, delLoading]);

	return (
		<Container>
			<h2>List Of Applies</h2>
			{modal.show && (
				<Modal deleteFalse={handleDeleteFalse} deleteTrue={handleDeleteTrue}>
					Confirm Deletion Please
				</Modal>
			)}
			<IconWrapper>
				<Link to='/add/apply'>
					<Icon type='button'>
						<PlusIcon>&#43;</PlusIcon>
					</Icon>
				</Link>
			</IconWrapper>
			{error.message || delErr.message ? (
				<MessageBox type='error'>
					{error.message ? error.message : delErr.message}
				</MessageBox>
			) : isLoading || delLoading ? (
				<Loader />
			) : (
				applies && (
					<CardWrapper>
						{applies.map((apply) => (
							<Card
								key={uuidv4()}
								_id={apply._id}
								corporation={apply.corporation}
								position={apply.position}
								createdAt={apply.createdAt!}
								reminder={apply.reminder!}
								technologies={apply.techno}
								comment={apply.comment}
								city={apply.city}
								email={apply.email}
								setModal={setModal}
							/>
						))}
					</CardWrapper>
				)
			)}
		</Container>
	);
};

export default Homepage;

const Container = styled.div`
	h2 {
		text-align: center;
	}
`;

const CardWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const IconWrapper = styled.div`
	width: 100%;
	padding: 0.5rem;
	display: flex;
	justify-content: flex-end;
`;

const PlusIcon = styled.div``;

const Icon = styled.button`
	position: relative;
	border: solid 0.1rem transparent;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: #ffa31a;
	color: #000;
	transition: 0.5s;
	cursor: pointer;

	${PlusIcon} {
		color: #000000;
		position: absolute;
		top: 50%;
		left: 50%;
		font-size: 1rem;
		transform: translate(-50%, -50%);
	}

	@media screen and (min-width: 1024px) {
		width: 50px;
		height: 50px;

		:hover {
			background-color: black;
			${PlusIcon} {
				color: #ffa31a;
			}
		}
	}
`;
