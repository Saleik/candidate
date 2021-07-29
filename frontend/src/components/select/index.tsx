import React from 'react';
import styled from 'styled-components';

const Select = () => {
	return (
		<Wrapper>
			<label htmlFor='technologies'>Choose the technologies:</label>
			<select name='technologies' id='technologies' multiple>
				<option value=''>--Please choose--</option>
				<option value='HTML5'>HTML5</option>
				<option value='CSS3'>CSS3</option>
				<option value='JS'>Javascript</option>
				<option value='ReactJS'>ReactJS</option>
				<option value='VueJS'>VueJS</option>
				<option value='MongoDB'>MongoDB</option>
				<option value='SQL'>SQL</option>
				<option value='MariaDB'>MariaDB</option>
				<option value='Git'>Git</option>
				<option value='SVN'>SVN</option>
			</select>
		</Wrapper>
	);
};

export default Select;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	select {
		border: 0;
		border-radius: 0.5rem;
	}
`;
