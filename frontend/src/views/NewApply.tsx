import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BackButton from '../components/backButton';
import Button from '../components/button';
import DatePicker from '../components/datePicker';
import Field from '../components/field';
import MessageBox from '../components/messageBox';
import Select, { IObjectOptions } from '../components/select';
import Textarea from '../components/textarea';

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

interface IFormData {
	dateOfRecall: Date;
	corporation: string;
	email: string;
	position: string;
	city: string;
	technologies: string;
	comment: string;
}

const NewApply = () => {
	const [dateOfRecall, setDateOfRecall] = useState('');
	const [corporation, setCorporation] = useState('');
	const [email, setEmail] = useState('');
	const [position, setPosition] = useState('');
	const [city, setCity] = useState('');
	const [technologies, setTechnologies] = useState(['']);
	const [comment, setComment] = useState('');
	const [errorMessage, setErrorMessage] = useState<boolean | string>(false);

	const dispatch = useDispatch();

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const validEmail = new RegExp(
			'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
		);
		const recall = dateOfRecall ? new Date(dateOfRecall) : '';
		if (
			!!recall &&
			!!corporation &&
			!!email &&
			!!position &&
			!!city &&
			!!technologies &&
			!!comment
		) {
			if (validEmail.test(email)) {
				if (recall.getTime() === recall.getTime()) {
					if (comment.length <= 200) {
						const formData: IFormData = {
							dateOfRecall: recall,
							corporation: corporation.toString().toLowerCase(),
							email: email.toString().toLowerCase(),
							position: position.toString().toLowerCase(),
							city: city.toString().toLowerCase(),
							technologies: technologies.join(','),
							comment: comment.toString().toLowerCase(),
						};

						console.log(formData.technologies);
					} else {
						setErrorMessage('Exceed maximum character at comment field.');
					}
				} else {
					setErrorMessage('Invalid date of recall.');
				}
			} else {
				setErrorMessage('E-mail Invalid');
			}
		} else {
			setErrorMessage('Please complete all fields.');
		}
	};

	return (
		<Container>
			<BackButton />
			<h2>Add New Apply</h2>
			{errorMessage && <MessageBox type='warning'>{errorMessage}</MessageBox>}
			<form onSubmit={onSubmit}>
				<DatePicker onChange={setDateOfRecall} />
				<Field
					label='Corporation'
					type='text'
					name='corporation'
					onChange={setCorporation}
					required
				/>
				<Field
					label='E-mail'
					type='text'
					name='email'
					onChange={setEmail}
					/* required */
				/>
				<Field
					label='Position'
					type='text'
					name='position'
					onChange={setPosition}
					required
				/>
				<Field
					label='City'
					type='text'
					name='city'
					onChange={setCity}
					required
				/>
				<Select
					multiple
					name={'technologies'}
					label={'Choose The Technologies'}
					onChange={setTechnologies}
					options={techOptions}
					selectedOption={technologies}
				/>
				<Textarea
					name='comment'
					label='Comment'
					required
					onChange={setComment}
					maxLength={200}
				/>
				<ButtonWrapper>
					<Button type='submit'>Store</Button>
				</ButtonWrapper>
			</form>
		</Container>
	);
};

export default NewApply;

const Container = styled.div`
	h2 {
		text-align: center;
	}
`;

const ButtonWrapper = styled.div`
	width: 100%;
	text-align: center;
`;
