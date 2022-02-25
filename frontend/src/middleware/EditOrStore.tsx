import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../components/loader';
import { fetchById, getByIdSelector } from '../features/apply/getByIdSlice';
import { authSelector } from '../features/auth/authSlice';
import StoreApply from '../views/storeApply';

type UseParams = {
	id: string;
};

const EditOrStore = () => {
	const { id }: UseParams = useParams();
	const [edit] = useState(!!id);

	const { apply } = useSelector(getByIdSelector);
	const { currentUser } = useSelector(authSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		if (edit && currentUser) {
			dispatch(fetchById(id, currentUser.token));
		}
	}, []);

	if (edit && apply && currentUser) {
		const defaultValues = {
			corporation: apply.corporation,
			email: apply.email,
			position: apply.position,
			city: apply.city,
			technologies: apply.techno.split(','),
			comment: apply.comment,
			date: moment(apply.reminder).format('YYYY-MM-DD'),
		};
		return (
			<StoreApply
				type='edit'
				defaultValues={defaultValues}
				id={apply._id}
				token={currentUser.token}
			/>
		);
	} else if (!edit && currentUser) {
		const defaultValues = {
			corporation: '',
			email: '',
			position: '',
			city: '',
			technologies: [],
			comment: '',
			date: '',
		};
		return (
			<StoreApply
				type='store'
				defaultValues={defaultValues}
				id={currentUser._id}
				token={currentUser.token}
			/>
		);
	} else {
		return <Loader />;
	}
};

export default EditOrStore;
