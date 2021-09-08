import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import validator from '../utils/validateInfo';
import { store } from '../features/apply/storeSlice';
import { signin } from '../features/auth/authSlice';
import { signUp } from '../features/user/registerSlice';
import { edit } from '../features/apply/editSlice';

export interface IValues {
	[key: string]: string | string[];
}

export interface IErrors {
	[key: string]: string;
}

export type ActionType = 'store' | 'edit' | 'register' | 'signin' | 'signUp';

const useForm = (
	fields: IValues,
	actionType: ActionType,
	id?: string,
	token?: string
) => {
	const [values, setValues] = useState<IValues>(fields);
	const [errors, setErrors] = useState<{} | IErrors>({});
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
			case 'signin': {
				dispatch(signin(values));
				break;
			}
			case 'signUp': {
				dispatch(signUp(values));
				break;
			}
			case 'store': {
				if (id && token) {
					/* dispatch(store(values, id, token)); */
					console.log('storing...');
					break;
				} else {
					console.error('UserId or token are not provided.');
					break;
				}
			}
			case 'edit': {
				if (id && token) {
					dispatch(edit(values, id, token));
					break;
				} else {
					console.error('ApplyId or token are not provided.');
					break;
				}
			}
		}
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			fetch();
		}
		return () => {
			setIsSubmitting(false);
		};
	}, [errors]);

	return {
		values,
		handleChange,
		handleSelect,
		handleSubmit,
		errors,
	};
};

export default useForm;
