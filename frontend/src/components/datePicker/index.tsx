import React from 'react';
import styled from 'styled-components';

const DatePicker = () => {
	return (
		<Wrapper>
			<label htmlFor='dateRecall'>Date Of Recall</label>
			<input type='date' name='dateRecall' />
		</Wrapper>
	);
};

export default DatePicker;

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0;

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
