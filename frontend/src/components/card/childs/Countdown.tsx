import moment from 'moment';
import React from 'react';
type Props = {
	revival: Date;
};

const Countdown = ({ revival }: Props) => {
	const timesRemaining = () => {
		const dateForRevival = moment(revival);
		const currentDate = moment().toDate().getTime();
		console.log(currentDate);
		console.log(dateForRevival);
	};

	timesRemaining();

	return <span>Times Before Revival:</span>;
};

export default Countdown;
