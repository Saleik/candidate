import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import Countdown from './childs/Countdown';

type Props = {
	corporation: string;
	position: string;
	technologies: string;
	comment: string;
	city: string;
	firstApply: Date;
	revival: Date;
};

const Card = ({
	corporation,
	position,
	technologies,
	comment,
	city,
	firstApply,
	revival,
}: Props) => {
	const dateHandler = (date: Date) => {
		return moment(date).format('DD/MM/YY');
	};
	const technologiesArray = technologies.split(',');
	return (
		<CardContainer>
			<CardHeader>
				<div>
					<h3>{corporation}</h3>
				</div>
				<CreatedAt>
					<span> First Apply At: {dateHandler(firstApply)}</span>
				</CreatedAt>
				<DelIcon>&#10539;</DelIcon>
			</CardHeader>
			<CardBody>
				<div>
					<h4>{position}</h4>
				</div>
				<SkillsList>
					<ul>
						{technologiesArray.map((techno, key) => (
							<li key={uuidv4()}>
								{key !== technologiesArray.length - 1 ? techno + '/' : techno}
							</li>
						))}
					</ul>
				</SkillsList>
				<div>
					<p>{comment}</p>
				</div>
			</CardBody>
			<CardFooter>
				<span>
					City: <b>{city}</b>
				</span>
				<Countdown
					timeTillDate={revival.toString()}
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
	cursor: pointer;
	@media screen and (min-width: 1024px) {
		width: 50%;
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

const DelIcon = styled.span`
	color: red;
	grid-column: 3;
	justify-self: center;
	align-self: center;
	cursor: pointer;

	@media screen and (min-width: 1024px) {
		:hover {
			transform: scale(1.5);
			transition: 0.5s;
			font-weight: bold;
		}
	}
`;

const CardBody = styled.div`
	display: flex;
	flex-direction: column;
	h4 {
		padding: 0.25rem;
		color: #ffa31a;
		text-align: center;
	}
	p {
		text-align: justify;
		padding: 0 1rem;
		color: #ffff;
	}
`;
const SkillsList = styled.div`
	ul {
		color: #0099ff;
		margin: 0;
		padding-left: 1rem;
		li {
			display: inline;
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
