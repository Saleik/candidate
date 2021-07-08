import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import Field from '../components/field';
import MessageBox from '../components/messageBox';
import useToggle from '../hooks/useToggle';

const Register = () => {
	//E-mail
	const [email, setEmail] = useState('');
	const [emailErr, setEmailErr] = useState('');
	const validEmail = new RegExp(
		'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
	);
	//Password
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [pwdError, setPwdError] = useState('');

	const [errorForm, setErrorForm] = useToggle(false);

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validEmail.test(email)) {
			setEmailErr('Invalid E-mail');
			setErrorForm();
		}

		if (password.length > 0) {
			if (password === confirmPassword) {
				//TODO:Store to bdd

				console.log('good');
			} else {
				setPwdError('Please Enter a Password');
				setErrorForm();
			}
		} else {
			setPwdError('Please Enter a Password');
			setErrorForm();
		}
	};
	return (
		<Container>
			<h2>Register Form</h2>
			{emailErr && (
				<MessageBox setToggle={setErrorForm} type='warning'>
					{emailErr}
				</MessageBox>
			)}
			{pwdError && (
				<MessageBox setToggle={setErrorForm} type='warning'>
					{pwdError}
				</MessageBox>
			)}
			<form onSubmit={handleSubmit}>
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
