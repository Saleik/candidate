import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/backButton';
import Button from '../components/button';
import Field from '../components/field';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import { registerSelector, signUp } from '../features/user/registerSlice';
interface IFormData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

const Register = () => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState<boolean | string>(false);
	const { isRegister, isLoading, error } = useSelector(registerSelector);
	const dispatch = useDispatch();
	const history = useHistory();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const validEmail = new RegExp(
			'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
		);
		if (
			!!lastname &&
			!!firstname &&
			!!email &&
			!!password &&
			!!confirmPassword
		) {
			if (validEmail.test(email)) {
				if (password === confirmPassword) {
					const formData: IFormData = {
						firstname: firstname.toString().toLowerCase(),
						lastname: lastname.toString().toLowerCase(),
						email: email.toString().toLowerCase(),
						password: password.toString(),
					};

					dispatch(signUp(formData));
				} else {
					setErrorMessage('Password Not Identical');
				}
			} else {
				setErrorMessage('E-mail Invalid');
			}
		} else {
			setErrorMessage('Please complete all fields.');
		}
	};

	useEffect(() => {
		if (isRegister) history.push('/');
		if (error.message) {
			setErrorMessage(error.message);
		}
	}, [error.message, isRegister]);
	return (
		<Container>
			<BackButton />
			<div>
				<h2>Register Form</h2>
			</div>
			{errorMessage && <MessageBox type='warning'>{errorMessage}</MessageBox>}
			{isLoading ? (
				<Loader />
			) : (
				<form onSubmit={onSubmit}>
					<div>
						<Field name='firstname' label='Firstname' onChange={setFirstname} />
					</div>
					<div>
						<Field name='lastname' label='Lastname' onChange={setLastname} />
					</div>
					<div>
						<Field
							type='email'
							name='email'
							label='E-mail'
							onChange={setEmail}
							required
						/>
					</div>
					<div>
						<Field
							type='password'
							name='password'
							label='Password'
							onChange={setPassword}
							required
						/>
					</div>
					<div>
						<Field
							type='password'
							name='confirmPassword'
							label='Confirm Your Password'
							onChange={setConfirmPassword}
							required
						/>
					</div>
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
