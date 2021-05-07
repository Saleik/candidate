import React from 'react';
import brand from '../../assets/images/logo.svg';
import './styles.css';

const Logo = () => {
	return (
		<div className='container'>
			<img src={brand} alt='logo' />
		</div>
	);
};

export default Logo;
