import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import DatePicker from '../components/datePicker';
import Field from '../components/field';
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

const NewApply = () => {
	const [dateOfRecall, setDateOfRecall] = useState('');
	const [corporation, setCorporation] = useState('');
	const [position, setPosition] = useState('');
	const [city, setCity] = useState('');
	const [technologies, setTechnologies] = useState(['']);
	const [comment, setComment] = useState('');

	console.log(comment.length);
	const history = useHistory();
	return (
		<Container>
			<BackIconWrapper>
				<BackIcon type='button' onClick={() => history.goBack()}>
					&#8592;
				</BackIcon>
			</BackIconWrapper>
			<h2>Add New Apply</h2>
			<form>
				<DatePicker onChange={setDateOfRecall} />
				<Field
					label='Corporation'
					type='text'
					name='corporation'
					onChange={setCorporation}
					required
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
					maxLength={300}
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

const BackIconWrapper = styled.div`
	width: 100%;
	height: auto;
`;
const BackIcon = styled.button`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	border: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	background-color: #ffa31a;
	color: #000;
	cursor: pointer;
	transition: all 0.5s;
	@media screen and (min-width: 1024px) {
		:hover {
			background-color: #000;
			color: #ffa31a;
			transform: scale(1.1);
		}
	}
`;
