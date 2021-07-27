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

//TODO: temporary skills array

const skills = ['HTML5', 'CSS3', 'JS', 'ReactJS', 'Git', 'GitHub', 'Jest'];

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
			<h2>homepage</h2>
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
									skills={skills}
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
