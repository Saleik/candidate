import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Apply from '../models/apply';
import data from '../data';

const NAMESPACE = 'Apply';

const seed = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Apply seed to db.');
	const createdApplies = await Apply.insertMany(data.applies);
	return res.status(200).send({ createdApplies });
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Get all current User applies');

	const userId = req.query.userId;

	const applies = await Apply.find({ userId: userId }).catch(
		(err: { message: string }) => console.log('Caught:', err.message)
	);

	if (applies && applies.length > 0) {
		return res.status(200).json(applies);
	} else {
		return res.status(404).json({
			message: 'No apply found.',
		});
	}
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Store apply to db');
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

	if (createdApply) {
		return res.status(201).json({
			message: 'Succeed.',
		});
	}
	return res.status(500).json({
		message: 'Error while adding, please try again.',
	});
};

export const del = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Delete apply');

	const isDeleted = await Apply.findByIdAndDelete(req.body._id).catch(
		(err: { message: string }) => console.log('Caught:', err.message)
	);

	if (isDeleted) {
		return res.status(200).json({
			message: 'Deleted Successfully.',
		});
	} else {
		return res.status(404).json({
			message: 'Apply id not found.',
		});
	}
};

export default {
	seed,
	getAll,
	register,
	del,
};
