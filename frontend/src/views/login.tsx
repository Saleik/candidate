import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/field';
import Button from '../components/button';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import styled from 'styled-components';
import { authSelector, login } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useToggle from '../hooks/useToggle';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useToggle(false);
	const history = useHistory();
	const { isLoading, error, isAuth } = useSelector(authSelector);

	const dispatch = useDispatch();

	const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(email.toString().toLowerCase(), password.toString()));
	};
	useEffect(() => {
		if (isAuth) {
			history.push('/');
		}

		if (error.message) setMessage();
	}, [isAuth, error.message]);
	return (
		<Container>
			<h2>Sign In</h2>
			{error.message && message ? (
				<MessageBox setToggle={setMessage} type='error'>
					{error.message}
				</MessageBox>
			) : (
				''
			)}
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={submitHandler}>
					<Wrapper>
						<Field
							type='email'
							name='email'
							placeholder='Enter Your E-mail'
							onChange={setEmail}
							required
						/>
					</Wrapper>
					<Field
						type='password'
						name='password'
						placeholder='Enter Your Password'
						onChange={setPassword}
						required
					/>
					<Wrapper>
						<Button type='submit'>Sign In</Button>
					</Wrapper>
					<div>
						New customer ? <Link to='/register'>Create your account</Link>
					</div>
				</form>
			)}
		</Container>
	);
};

export default Login;

const Container = styled.div`
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		max-width: 30rem;
	}
	h2 {
		margin: 0;
		color: #000;
	}
`;

const Wrapper = styled.div`
	padding: 1rem 0;
`;
