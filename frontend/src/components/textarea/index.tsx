import React, { Dispatch } from 'react';
import styled from 'styled-components';

type Props = {
	onChange: Dispatch<React.SetStateAction<string>>;
	name: string;
	label: string;
	maxLength: number;
	required?: boolean;
};

const Textarea = ({ onChange, name, label, maxLength }: Props) => {
	return (
		<Wrapper>
			<label htmlFor={name}>{label}:</label>
			<textarea
				onChange={(e) => onChange(e.target.value)}
				name={name}
				maxLength={maxLength}
				id={name}
				required
				placeholder={`${maxLength} character maximum...`}
			/>
		</Wrapper>
	);
};

export default Textarea;

Textarea.defaultProps = {
	required: false,
};
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
		height: 10rem;
		width: 100%;
		font-size: 1rem;

		:focus {
			outline: none;
		}
	}
`;
