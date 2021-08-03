import React, { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

export interface IObjectOptions {
	[key: string]: string;
}
type Props = {
	onChange: Dispatch<React.SetStateAction<string[]>>;
	label: string;
	options: IObjectOptions;
	name: string;
	multiple?: boolean;
	selectedOption: string[] | undefined;
};
const Select = ({
	onChange,
	label,
	options,
	selectedOption,
	name,
	multiple,
}: Props) => {
	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let technologies = Array.from(
			e.target.selectedOptions,
			(option: any) => option.value
		);
		onChange(technologies);
	};
	return (
		<Wrapper>
			<label htmlFor='technologies'>{label}</label>
			<select
				onChange={handleSelect}
				name={name}
				id={name}
				multiple={multiple}
				value={selectedOption}>
				{options &&
					Object.entries(options).map((value) => {
						const optionValue = value[0];
						const label = value[1];
						return (
							<option key={uuidv4()} value={optionValue}>
								{label}
							</option>
						);
					})}
			</select>
		</Wrapper>
	);
};

export default Select;

Select.defaultProps = {
	mutiple: false,
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	select {
		border: 0;
		border-radius: 0.5rem;
	}
`;
