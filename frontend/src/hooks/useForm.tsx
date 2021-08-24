import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import validator from '../utils/validateInfo';
import { store } from '../features/apply/storeApplySlice';
import { signin } from '../features/auth/authSlice';

export interface IValues {
	[key: string]: string | string[];
}

type ActionType = 'store' | 'register' | 'signin';

//TODO: Generic input name
const useForm = (
	fields: IValues,
	actionType: ActionType,
	userId?: string,
	token?: string
) => {
	const [values, setValues] = useState<IValues>(fields);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
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
		setErrors(validator(values));
		setIsSubmitting(true);
	};

	const fetch = () => {
		switch (actionType) {
			case 'store': {
				if (userId && token) {
					dispatch(store(values, userId, token));
					break;
				} else {
					console.error('UserId & token not provided.');
					break;
				}
			}
			case 'signin': {
				dispatch(signin(values));
				break;
			}
		}
	};
	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			fetch();
		}
	}, [errors]);

	return { values, handleChange, handleSelect, handleSubmit, errors };
};

export default useForm;
