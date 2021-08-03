import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/card';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import { fetchAll, getAllSelector } from '../features/apply/getAllSlice';
import { authSelector } from '../features/auth/authSlice';
import useToggle from '../hooks/useToggle';

//FIXME: error conditional rendering applies

const Homepage = () => {
	const { currentUser } = useSelector(authSelector);
	const { applies, isLoading, error } = useSelector(getAllSelector);
	const [message, setMessage] = useToggle(false);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			dispatch(fetchAll(currentUser?._id!));
		})();

		if (error.message) setMessage();
	}, [currentUser, error.message]);
	return (
		<Container>
			<h2>List Of Applies</h2>
			<IconWrapper>
				<Link to={`/add/apply`}>
					<AddIcon type='button'>
						<PlusIcon>&#43;</PlusIcon>
					</AddIcon>
				</Link>
			</IconWrapper>
			{error.message && message ? (
				<MessageBox setToggle={setMessage} type='error'>
					{error.message}
				</MessageBox>
			) : isLoading ? (
				<Loader />
			) : (
				applies && (
					<CardWrapper>
						{applies.map((apply) => (
							<>
								<Card
									key={uuidv4()}
									corporation={apply.corporation}
									position={apply.position}
									firstApply={apply.firstApply}
									revival={apply.revival}
									technologies={apply.techno}
									comment={apply.comment}
									city={apply.city}></Card>
								<br />
							</>
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

const AddIcon = styled.button`
	position: relative;
	border: solid 0.1rem transparent;
	width: 20px;
	height: 20px;
	border-radius: 100%;
	background-color: #ffa31a;
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
			color: #ffa31a;
		}
	}
`;
