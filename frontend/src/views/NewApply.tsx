import React from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import DatePicker from '../components/datePicker';
import Field from '../components/field';
import Select from '../components/select';
import Textarea from '../components/textarea';

const NewApply = () => {
	return (
		<Container>
			<h2>Add New Apply</h2>
			<form>
				<DatePicker />
				<Field label='Corporation' type='text' name='corporation' required />
				<Field label='Position' type='text' name='position' required />
				<Field label='City' type='text' name='city' required />
				<Select />
				<Textarea />
				<ButtonWrapper>
					<Button type='submit'>Store</Button>
				</ButtonWrapper>
			</form>
		</Container>
	);
};

export default NewApply;

const Container = styled.div`
	h2 {
		text-align: center;
	}
`;

const ButtonWrapper = styled.div`
	width: 100%;
	text-align: center;
`;
