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
		const days = countdown.format('D');
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
	useEffect(() => {
		setInterval(() => {
			timesRemaining();
		}, 1000);
		return clearInterval();
	}, []);
	return (
		<TimeBeforeRevival days={'timeRemaining.days'}>
			Times Before Revival:
			<b>
				{timeRemaining.days} Days - {timeRemaining.hours}:
				{timeRemaining.minutes}:{timeRemaining.seconds}
			</b>
		</TimeBeforeRevival>
	);
};

type TimeBeforeRevivalProps = {
	days: string | undefined;
};
const TimeBeforeRevival = styled.span<TimeBeforeRevivalProps>`
	color: #ffff;
	padding: 0 1rem;
	display: flex;
	flex-wrap: wrap;

	b {
		color: ${({ days }) =>
			days && parseInt(days) < 7 && parseInt(days) > 2
				? '#ffff'
				: days && parseInt(days) <= 2
				? '#ff3300'
				: '#1faa1f'};
		padding-left: 0.2rem;
		width: auto;
	}
`;
export default Countdown;
