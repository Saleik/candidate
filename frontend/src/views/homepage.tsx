import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	const [showError, setShowError] = useToggle(false);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			dispatch(fetchAll(currentUser?._id!));
		})();
	}, []);

	return (
		<Container>
			<h2>List Of Applies</h2>
			<AddIcon>+</AddIcon>
			{error.message ? (
				<MessageBox setToggle={setShowError} type='error'>
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

const AddIcon = styled.div`
	border: solid 0.1rem transparent;
	margin-bottom: 1rem;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	border-radius: 50%;
	font-size: 1.5rem;
	color: #000;
	background-color: #ffa31a;
	cursor: pointer;
	transition: 0.5s;
	@media screen and (min-width: 1024px) {
		width: 50px;
		height: 50px;
		:hover {
			background-color: black;
			color: #ffa31a;
		}
	}
`;
