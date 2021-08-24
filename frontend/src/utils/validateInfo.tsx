import { IValues } from '../hooks/useForm';

interface IErrors {
	[key: string]: string;
}
const validateInfo = (values: IValues) => {
	let errors: any = {};

	Object.keys(values).forEach((key) => {
		if (typeof values[key] === 'string') {
			if (!values[key]) {
				const field = key.charAt(0).toUpperCase() + key.slice(1);
				errors[key] = `${field} is required.`;
			} else if (key === 'date') {
				const recall = new Date(values[key].toString());
				const today = new Date();
				if (recall.getTime() === recall.getTime() && recall < today) {
					errors[key] = 'Please select a date beyond today.';
				}
			} else if (key === 'email') {
				const validEmail = new RegExp(
					'^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
				);

				if (!validEmail.test(values[key].toString())) {
					errors[key] = 'Invalid E-mail.';
				}
			} else if (key === 'password') {
				const validPassword =
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
				if (!validPassword.test(values[key].toString())) {
					errors[key] = 'Invalid Password.';
				}
			}
		} else if (Array.isArray(values[key])) {
			if (values[key].length <= 1) {
				errors[key] = 'Please select multiple technologies.';
			}
		}
	});

	return errors;
};
export default validateInfo;
