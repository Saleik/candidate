import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import styled from 'styled-components';
import { authSelector } from '../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useForm from '../hooks/useForm';

const Login = () => {
	const { handleSubmit, handleChange, errors } = useForm(
		{
			email: '',
			password: '',
		},
		'signin'
	);

	const history = useHistory();
	const { isLoading, error: sendingError, isAuth } = useSelector(authSelector);

	useEffect(() => {
		if (isAuth) {
			history.push('/');
		}
	}, [isAuth]);

	return (
		<Container>
			<h2>Sign In</h2>
			{sendingError.message && (
				<MessageBox type='error'>{sendingError.message}</MessageBox>
			)}
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={handleSubmit}>
					<FormGroup>
						<Input
							type='email'
							name='email'
							placeholder='Enter Your E-mail'
							onChange={handleChange}
						/>
						{'email' in errors && <FieldInfo>{errors.email}</FieldInfo>}
					</FormGroup>
					<FormGroup>
						<Input
							type='password'
							name='password'
							placeholder='Enter Your Password'
							onChange={handleChange}
						/>
						{'password' in errors && <FieldInfo>{errors.password}</FieldInfo>}
					</FormGroup>
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
	display: flex;
	flex-direction: column;
	align-items: center;

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
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.5rem 0;
`;
const FieldInfo = styled.span`
	color: #ff0000;
`;

const Input = styled.input`
	border: 0;
	border-bottom: 0.1rem solid #000;
	background-color: unset;
	outline: none;
	color: #000;
	width: 100%;

	::placeholder {
		color: #000;
	}
`;

const Wrapper = styled.div`
	padding: 1rem 0;
`;
