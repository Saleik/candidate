import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/field';
import Button from '../components/button';
import styled from 'styled-components';
import { signin } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userSignin = useSelector((state) => state.userSignin);
	const dispatch = useDispatch();

	const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};

	return (
		<Container>
			<h2>Sign In</h2>
			<form onSubmit={submitHandler}>
				<Wrapper>
					<Field
						type='email'
						name='email'
						placeholder='Enter Your E-mail'
						onChange={setEmail}
					/>
				</Wrapper>
				<Field
					type='password'
					name='password'
					placeholder='Enter Your Password'
					onChange={setPassword}
				/>
				<Wrapper>
					<Button type='submit'>Sign In</Button>
				</Wrapper>
				<div>
					New customer ? <Link to='#'>Create your account</Link>
				</div>
			</form>
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
