import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Apply from '../models/apply';
import data from '../data';

const NAMESPACE = 'Apply';

const seed = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Apply seed to db.');
	const createdApply = await Apply.insertMany(data.applies);
	return res.status(200).send({ createdApply });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Register apply to db');

	const { corporation, position, city, firstApply, revival, userId } = req.body;

	const apply = new Apply({
		corporation: corporation.toString(),
		position: position.toString(),
		city: city.toString(),
		firstApply: new Date(firstApply),
		revival: new Date(revival),
		userId: userId,
	});

	const createdApply = await apply.save();

	res.status(201).send({
		corporation: createdApply.corporation,
		position: createdApply.position,
		success: true,
	});
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Get all current User applies');

	const userId = req.query.userId;

	const applies = await Apply.find({ userId: userId }).catch(
		(err: { message: string }) => console.log('Caught:', err.message)
	);

	if (applies) {
		res.status(200).send(applies);
		return;
	}
	res.status(404).send({
		message: 'Not Found',
	});
};
export default {
	seed,
	register,
	getAll,
};
