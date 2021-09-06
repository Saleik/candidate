import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/backButton';
import Button from '../components/button';
import Loader from '../components/loader';
import MessageBox from '../components/messageBox';
import { v4 as uuidv4 } from 'uuid';
import { setStoreReset, storeSelector } from '../features/apply/storeSlice';
import useForm, { ActionType } from '../hooks/useForm';
import { setGetByIdReset } from '../features/apply/getByIdSlice';
import { editSelector, setEditSuccess } from '../features/apply/editSlice';

export interface IObjectOptions {
	[key: string]: string;
}

const techOptions: IObjectOptions = {
	html5: 'HTML5',
	css3: 'CSS3',
	js: 'JavaScript',
	reactjs: 'ReactJS',
	vuejs: 'VueJS',
	angular: 'Angular',
	mongodb: 'MongoDB',
	firebase: 'Firebase',
	mariadb: 'MariaDB',
	postgresql: 'PostgreSQL',
	git: 'Git',
	svn: 'SVN',
	'styled-component': 'Styled-components',
	bootstrap: 'Bootstrap',
	materialui: 'MaterialUI',
	tailwindcss: 'TailwindCSS',
};

type Props = {
	defaultValues: any;
	id: string;
	token: string;
	type: ActionType;
};
const StoreApply = ({ defaultValues, id, token, type }: Props) => {
	const history = useHistory();
	//edit
	const {
		isLoading: loadingEdit,
		isEdit,
		error: errorToEdit,
	} = useSelector(editSelector);

	//add
	const {
		isLoading: loadingStore,
		isStore,
		error: errorToStore,
	} = useSelector(storeSelector);

	const { values, handleChange, handleSelect, handleSubmit, errors } = useForm(
		defaultValues,
		type,
		id,
		token
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isStore || isEdit) {
			history.goBack();
		}
		return () => {
			dispatch(setStoreReset());
			dispatch(setGetByIdReset());
			dispatch(setEditSuccess(false));
		};
	}, [isStore, isEdit]);

	return (
		<Container>
			<BackButton />
			{type === 'edit' ? <h2>Edit Apply</h2> : <h2>New Apply</h2>}
			{errorToStore.message ||
				(errorToEdit.message && (
					<MessageBox type='error'>
						{errorToStore.message || errorToEdit.message}
					</MessageBox>
				))}
			{loadingStore || loadingEdit ? (
				<Loader />
			) : (
				<form onSubmit={handleSubmit}>
					<DatePicker>
						<label htmlFor='date'>Date Of Recall</label>
						<input
							onChange={handleChange}
							type='date'
							name='date'
							value={values.date}
						/>
						{'date' in errors && <FieldInfo>{errors.date}</FieldInfo>}
					</DatePicker>
					<FormGroup>
						<label htmlFor='corporation'>Corporation</label>
						<Input
							type='text'
							name='corporation'
							onChange={handleChange}
							value={values.corporation}
							required
						/>
						{'corporation' in errors && (
							<FieldInfo>{errors.corporation}</FieldInfo>
						)}
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
						{'email' in errors && <FieldInfo>{errors.email}</FieldInfo>}
					</FormGroup>
					<FormGroup>
						<label htmlFor='position'>Position</label>
						<Input
							type='text'
							name='position'
							onChange={handleChange}
							value={values.position}
							required
						/>
						{'position' in errors && <FieldInfo>{errors.position}</FieldInfo>}
					</FormGroup>

					<FormGroup>
						<label htmlFor='city'>City</label>
						<Input
							type='text'
							name='city'
							onChange={handleChange}
							required
							value={values.city}
						/>
						{'city' in errors && <FieldInfo>{errors.city}</FieldInfo>}
					</FormGroup>
					<SelectTechno>
						<label htmlFor='technologies'>Technologies</label>
						<select
							onChange={handleSelect}
							name='technologies'
							id='technologies'
							multiple
							value={values.technologies}
							required>
							{Object.entries(techOptions).map((value) => {
								const optionValue = value[0];
								const label = value[1];
								return (
									<option key={uuidv4()} defaultValue={optionValue}>
										{label}
									</option>
								);
							})}
						</select>
						{type === 'edit' && (
							<>
								<span>
									Previous:{' '}
									{Array.from(defaultValues.technologies).map((tech) =>
										defaultValues.technologies[
											defaultValues.technologies.length - 1
										] !== tech
											? tech + '/'
											: tech
									)}
								</span>
								<span>
									Update:{' '}
									{Array.from(values.technologies).map((tech) =>
										values.technologies[values.technologies.length - 1] !== tech
											? tech + '/'
											: tech
									)}
								</span>
							</>
						)}
						{'technologies' in errors && (
							<FieldInfo>{errors.technologies}</FieldInfo>
						)}
					</SelectTechno>
					<Comment>
						<label htmlFor='comment'>Comment</label>
						<textarea
							onChange={handleChange}
							name='comment'
							maxLength={200}
							id='comment'
							required
							placeholder={`200 characters maximum...`}
							value={values.comment}
						/>
						{'comment' in errors && <FieldInfo>{errors.comment}</FieldInfo>}
					</Comment>
					<ButtonWrapper>
						<Button type='submit'>
							{type === 'edit' ? 'Update' : 'Store'}
						</Button>
					</ButtonWrapper>
				</form>
			)}
		</Container>
	);
};

export default StoreApply;

const Container = styled.div`
	h2 {
		text-align: center;
	}
`;
const DatePicker = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding-bottom: 1rem;

	label {
		padding-bottom: 0.5rem;
	}
	input {
		border: 0;
		background-color: #ffff;
		border-radius: 0.5rem;

		:focus {
			outline: none;
		}
	}
`;
const FormGroup = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-bottom: 1rem;
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

const SelectTechno = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 1rem;
	select {
		border: 0;
		border-radius: 0.5rem;
	}
`;
const Comment = styled.div`
	padding: 1rem 0;
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		padding-bottom: 0.5rem;
	}

	textarea {
		border: 0;
		border-radius: 0.5rem;
		resize: none;
		height: 10rem;
		width: 100%;
		font-size: 1rem;

		:focus {
			outline: none;
		}
	}
`;

const ButtonWrapper = styled.div`
	width: 100%;
	text-align: center;
`;
