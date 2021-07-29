import React from 'react';
import styled from 'styled-components';

const Textarea = () => {
	return (
		<Wrapper>
			<label htmlFor='textarea'>Comment:</label>
			<textarea name='textarea' maxLength={300} id='textarea' required />
		</Wrapper>
	);
};

export default Textarea;

const Wrapper = styled.div`
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
		height: 5rem;
		width: 100%;
		font-size: 1rem;

		:focus {
			outline: none;
		}
	}
`;
