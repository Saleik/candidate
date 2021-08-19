import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import validate from '../utils/validateInfo';
import { store } from '../features/apply/storeApplySlice';

export interface IValues {
	[key: string]: string | string[];
}

type ActionType = 'store' | 'register' | 'login';

//TODO: Generic input name
const useForm = (
	fields: IValues,
	actionType: ActionType,
	userId?: string,
	token?: string
) => {
	const [values, setValues] = useState<IValues>(fields);

	const [errors, setErrors] = useState({});

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let tech = Array.from(
			e.target.selectedOptions,
			(option: HTMLOptionElement) => option.value
		);
		setValues({ ...values, technologies: tech });
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const dispatch = useDispatch();

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setErrors(validate(values));

		if (Object.keys(errors).length == 0) {
			switch (actionType) {
				case 'store': {
					if (userId && token) {
						setValues({
							...values,
							userId: userId,
							token: token,
						});

						console.log(values);
						/* dispatch(store(values)); */
					} else {
						console.error('UserId & token not provided.');
					}
					break;
				}
			}
		}
	};

	return { values, handleChange, handleSelect, handleSubmit, errors };
};

export default useForm;
