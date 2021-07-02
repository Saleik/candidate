import React from 'react';
import styled from 'styled-components';

type FieldProps = {
	type: string;
	name: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	label?: string;
	placeholder: string;
};

const Field = ({ type, name, onChange, label, placeholder }: FieldProps) => {
	return (
		<>
			{label ? (
				<>
					<label htmlFor={name}>{name}</label>
					<SInput
						type={type}
						onChange={(e) => onChange(e.target.value)}
						name={name}
						id={name}
					/>
				</>
			) : (
				<SInput
					type={type}
					onChange={(e) => onChange(e.target.value)}
					name={name}
					id={name}
					placeholder={placeholder}
				/>
			)}
		</>
	);
};

export default Field;

const SInput = styled.input`
	border: 0;
	border-bottom: 0.1rem solid #000;
	background-color: unset;
	outline: none;
	color: #000;
	width: 100%;

	::placeholder {
		color: #000;
	}
`;
