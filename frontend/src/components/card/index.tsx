import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import Countdown from './childs/Countdown';
import { IModal } from '../../views/Homepage';
import { Link } from 'react-router-dom';

type Props = {
	_id: string;
	corporation: string;
	email: string;
	position: string;
	technologies: string;
	comment: string;
	city: string;
	createdAt: Date;
	reminder: Date;
	setModal: React.Dispatch<React.SetStateAction<IModal>>;
};

const Card = ({
	_id,
	corporation,
	position,
	email,
	technologies,
	comment,
	city,
	createdAt,
	reminder,
	setModal,
}: Props) => {
	const dateHandler = (date: Date) => {
		return moment(date).format('DD/MM/YY');
	};

	const technologiesArray = technologies.split(',');

	const handleDeleteApply = (_id: string) => {
		setModal({ show: true, id: _id });
	};

	return (
		<CardContainer>
			<CardHeader>
				<div>
					<h3>{corporation}</h3>
				</div>
				<CreatedAt>
					<span> Created At: {dateHandler(createdAt)}</span>
				</CreatedAt>
				<Actions>
					<Icon
						type='button'
						action='delete'
						onClick={() => handleDeleteApply(_id)}
						id={_id}>
						&#10539;
					</Icon>
					<Link
						to={{
							pathname: `/update/apply/${_id}`,
							state: {
								fromEditButton: true,
							},
						}}>
						<Icon type='button' action='edit'>
							&#9998;
						</Icon>
					</Link>
				</Actions>
			</CardHeader>
			<CardBody>
				<div>
					<h4>{position}</h4>
				</div>
				<SkillsList>
					<ul>
						{technologiesArray.map((techno, key) => (
							<li key={uuidv4()}>
								{key !== technologiesArray.length - 1
									? techno.toUpperCase() + '/'
									: techno.toUpperCase()}
							</li>
						))}
					</ul>
				</SkillsList>
				<Email>
					<span>
						E-mail:{' '}
						<b>
							<a href={`mailto:${email}`}>{email}</a>
						</b>
					</span>
				</Email>
				<div>
					<p>{comment}</p>
				</div>
			</CardBody>
			<CardFooter>
				<span>
					City: <b>{city}</b>
				</span>
				<Countdown
					timeTillDate={reminder.toString()}
					timeFormat='YYYY-MM-DD; hh:mm:ss Z'
				/>
			</CardFooter>
		</CardContainer>
	);
};

export default Card;
const CardContainer = styled.div`
	width: 100%;
	font-size: 0.8rem;
	height: auto;
	border-radius: 0.5rem;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.7);
	margin-bottom: 1rem;

	@media screen and (min-width: 1024px) {
		transform: scale(1);
		transition: 0.5s;

		:hover {
			transform: scale(1.05);
			box-shadow: 1px 1px 5px black;
		}
	}
`;
const CardHeader = styled.div`
	color: #007acc;
	background-color: #ffa31a;
	display: grid;
	grid-template-columns: 3fr 3fr 1fr;
	grid-template-rows: 3rem;
	h3 {
		padding: 0.25rem;
	}
`;

const CreatedAt = styled.div`
	justify-self: center;
	align-self: center;
	color: #fff;
`;

const Actions = styled.div`
	display: flex;
	grid-column: 3;
	justify-self: center;
	align-self: center;
`;

type IconProps = {
	action: 'edit' | 'delete';
};
const Icon = styled.button<IconProps>`
	color: #fff;
	cursor: pointer;
	padding: 0 0.5rem;
	background-color: unset;
	border: 0;

	@media screen and (min-width: 1024px) {
		:hover {
			color: ${({ action }) => (action === 'edit' ? '#007acc' : '#ff3300')};
			transform: scale(1.5);
			transition: 0.5s;
			font-weight: bold;
		}
	}
`;

const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 0.5rem;
	h4 {
		color: #ffa31a;
		text-align: center;
	}
	p {
		text-align: justify;
		color: #ffff;
	}
`;
const SkillsList = styled.div`
	ul {
		color: #0099ff;
		margin: 0;
		padding-left: 1rem;
		li {
			display: inline-flex;
		}
	}
`;

const CardFooter = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #ffa31a;
	color: white;
	padding: 0.5rem;
	justify-content: space-around;
`;

const Email = styled.div`
	color: #fff;
	padding-top: 0.5rem;

	a {
		color: #fff;
		cursor: pointer;
	}
`;
