import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../App/App';

describe('render title', () => {
	it('renders', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('h1').html()).toMatch(/Starter Kit Vite 😍/);
	});

	it('renders snapshots, too', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toMatchSnapshot();
	});
});
