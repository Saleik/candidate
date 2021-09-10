import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimeRemaining {
	days: undefined | string;
	hours: undefined | string;
	minutes: undefined | string;
	seconds: undefined | string;
}

type Props = {
	timeTillDate: string;
	timeFormat: string;
};
const Countdown = ({ timeTillDate, timeFormat }: Props) => {
	const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
		days: undefined,
		hours: undefined,
		minutes: undefined,
		seconds: undefined,
	});
	const timesRemaining = () => {
		const then: Moment = moment(timeTillDate, timeFormat);
		const now: Moment = moment();
		const countdown = moment(then.valueOf() - now.valueOf());
		const days = countdown.format('DD');
		const hours = countdown.format('HH');
		const minutes = countdown.format('mm');
		const seconds = countdown.format('ss');

		setTimeRemaining({
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		});
	};

	const datePassed = () => {
		const today = new Date();
		const recallDate = new Date(timeTillDate);

		if (recallDate < today) return true;
		else return false;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			timesRemaining();
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<TimeBeforeRecall valid={datePassed()} days={timeRemaining.days}>
			Times Before Recall:
			<b>
				{datePassed() && '-'}
				{timeRemaining.days} Days - {timeRemaining.hours}:
				{timeRemaining.minutes}:{timeRemaining.seconds}
			</b>
		</TimeBeforeRecall>
	);
};

type TimeBeforeRecallProps = {
	days: string | undefined;
	valid: boolean;
};
const TimeBeforeRecall = styled.span<TimeBeforeRecallProps>`
	color: #ffff;
	padding: 0 1rem;
	display: flex;
	flex-wrap: wrap;

	b {
		color: ${({ days, valid }) =>
			days && !valid && parseInt(days, 10) < 7 && parseInt(days, 10) > 2
				? '#ffff'
				: (days && parseInt(days, 10) <= 2) || valid
				? '#ff3300'
				: '#1faa1f'};
		padding-left: 0.2rem;
		width: auto;
	}
`;
export default Countdown;
