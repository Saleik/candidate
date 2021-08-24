import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/backButton';
import Button from '../components/button';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import { registerSelector } from '../features/user/registerSlice';
import useForm from '../hooks/useForm';

const Register = () => {
	const [errorRegister, setErrorRegister] = useState<boolean | string>(false);
	const [showPwd, setShowPwd] = useState(false);
	const { isRegister, isLoading, error } = useSelector(registerSelector);
	const history = useHistory();

	const { handleChange, handleSubmit, errors, values } = useForm(
		{
			firstname: '',
			lastname: '',
			email: '',
			password: '',
		},
		'signUp'
	);

	useEffect(() => {
		if (isRegister) history.push('/');
		if (error.message) {
			setErrorRegister(error.message);
		}
	}, [error.message, isRegister]);
	return (
		<Container>
			<BackButton />
			<div>
				<h2>Register Form</h2>
			</div>
			{errorRegister && <MessageBox type='warning'>{errorRegister}</MessageBox>}
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={handleSubmit}>
					<FormGroup>
						<label htmlFor='firstname'>Firstname</label>
						<Input
							type='text'
							name='firstname'
							onChange={handleChange}
							value={values.firstname}
							required
						/>
						{'firstname' in errors && (
							<FieldInfo>{errors?.firstname}</FieldInfo>
						)}
					</FormGroup>
					<FormGroup>
						<label htmlFor='lastname'>Lastname</label>
						<Input
							type='text'
							name='lastname'
							onChange={handleChange}
							value={values.lastname}
							required
						/>
						{'lastname' in errors && <FieldInfo>{errors?.lastname}</FieldInfo>}
					</FormGroup>
					<FormGroup>
						<label htmlFor='email'>E-mail</label>
						<Input
							type='text'
							name='email'
							onChange={handleChange}
							required
							value={values.email}
						/>
						{'email' in errors && <FieldInfo>{errors?.email}</FieldInfo>}
					</FormGroup>

					<FormGroup>
						<label htmlFor='password'>Password</label>
						<Input
							type={showPwd ? 'text' : 'password'}
							name='password'
							onChange={handleChange}
							required
							value={values.password}
						/>
						<ShowPassword>
							<label htmlFor='showPwd'>Show Password</label>{' '}
							<input
								type='checkbox'
								name='showPwd'
								onClick={() => setShowPwd(!showPwd)}
							/>
						</ShowPassword>

						{'password' in errors && <FieldInfo>{errors?.password}</FieldInfo>}
					</FormGroup>
					<br />
					<div>
						<Button type='submit'>Sign Up</Button>
					</div>
				</form>
			)}
		</Container>
	);
};

export default Register;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	form {
		display: flex;
		flex-direction: column;
		width: 15rem;
	}
	h2 {
		text-align: center;
		padding: 1rem;
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
const ShowPassword = styled.div`
	label {
		font-size: 0.7rem;
	}
`;
