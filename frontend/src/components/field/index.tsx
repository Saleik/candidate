import React, { Dispatch } from 'react';
import styled from 'styled-components';

type FieldProps = {
	type: string;
	name: string;
	onChange: Dispatch<React.SetStateAction<string>>;
	label?: string;
	placeholder?: string;
	required: boolean;
};

const Field = ({
	type,
	name,
	onChange,
	label,
	placeholder,
	required,
}: FieldProps) => {
	return (
		<>
			{label ? (
				<div>
					<label htmlFor={name}>{label}</label>
					<Input
						type={type}
						onChange={(e) => onChange(e.target.value)}
						name={name}
						id={name}
						required={required}
					/>
				</div>
			) : (
				<div>
					<Input
						type={type}
						onChange={(e) => onChange(e.target.value)}
						name={name}
						id={name}
						placeholder={placeholder}
						required={required}
					/>
				</div>
			)}
		</>
	);
};

export default Field;

Field.defaultProps = {
	type: 'text',
	required: false,
};
const Input = styled.input`
	border: 0;
	border-bottom: 0.1rem solid #000;
	background-color: unset;
	outline: none;
	color: #000;
	width: 100%;
	margin-bottom: 0.5rem;

	::placeholder {
		color: #000;
	}
`;
