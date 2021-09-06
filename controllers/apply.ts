import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Apply from '../models/apply';
import data from '../data';

const NAMESPACE = 'Apply';

const seed = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Apply seed to DB.');
	const createdApplies = await Apply.insertMany(data.applies);
	return res.status(200).send({ createdApplies });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Get all current User applies.');

	const userId = req.query.userId;

	const applies = await Apply.find({ userId: userId }).catch(
		(err: { message: string }) => console.log('Caught:', err.message)
	);

	if (applies && applies.length > 0) return res.status(200).json(applies);
	else
		return res.status(404).json({
			message: 'No apply found.',
		});
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Get apply by ID.');
	const id = req.params.id;

	if (id) {
		const apply = await Apply.findById(id).catch((err: { message: string }) =>
			console.log('Caught:', err.message)
		);
		if (apply) return res.status(200).json(apply);
		else
			return res.status(404).json({
				message: 'Not Found',
			});
	} else {
		return res.status(400).json({
			message: 'Invalid ID',
		});
	}
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Store apply to DB.');
	const {
		corporation,
		email,
		position,
		techno,
		comment,
		city,
		reminder,
		userId,
	} = req.body;
	const apply = new Apply({
		corporation: corporation,
		email: email,
		position: position,
		techno: techno.join(','),
		comment: comment,
		city: city,
		reminder: reminder,
		userId: userId,
	});

	const createdApply = await apply
		.save()
		.catch((err: { message: string }) => console.log('Caught:', err.message));

	if (createdApply)
		return res.status(201).json({
			message: 'Succeed.',
		});

	return res.status(500).json({
		message: 'Error while adding, please try again.',
	});
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Edit Apply.');

	const { id, corporation, email, position, techno, comment, city, reminder } =
		req.body;
	const apply = await Apply.findById(id).catch((err: { message: string }) =>
		console.log('Caught:', err.message)
	);

	if (apply) {
		apply.corporation = corporation;
		apply.email = email;
		apply.position = position;
		apply.techno = techno?.join(',');
		apply.comment = comment;
		apply.city = city;
		apply.reminder = reminder;

		const updatedApply = await apply
			.save()
			.catch((err: { message: string }) => console.log('Caught:', err.message));

		if (updatedApply)
			return res.status(200).json({ message: 'Apply Updated Successfully.' });
		else
			return res.status(400).json({
				message: 'Error while updating apply.',
			});
	} else {
		return res.status(404).json({
			message: 'Not Found',
		});
	}
};

export const del = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Delete apply.');

	const isDeleted = await Apply.findByIdAndDelete(req.body._id).catch(
		(err: { message: string }) => console.log('Caught:', err.message)
	);

	if (isDeleted)
		return res.status(200).json({
			message: 'Deleted Successfully.',
		});
	else
		return res.status(404).json({
			message: 'Apply id not found.',
		});
};

export default {
	seed,
	getAll,
	getById,
	register,
	edit,
	del,
};
