import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import User from '../models/user';
import generateJWT from '../middlewares/generateJWT';
import data from '../data';
import bcrypt from 'bcrypt';

const NAMESPACE = 'User';

const seed = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Users seed to db.`);
	const createdUsers = await User.insertMany(data.users);

	return res.status(200).send({ createdUsers });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Token validated, user authorized');

	return res.status(200).send({
		message: 'Authorized',
	});
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Login to app.`);

	const user = await User.findOne({
		email: req.body.email,
	});

	if (user) {
		if (bcrypt.compareSync(req.body.password, user.password)) {
			res.status(200).send({
				_id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				token: generateJWT(user),
			});
		}
	}
};

const register = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Register user in db.`);

	const { email, password } = req.body;

	bcrypt.hash(password, 10, (hashError, hash) => {
		if (hashError) {
			return res.status(500).send({
				message: hashError.message,
				error: hashError,
			});
		}
	});

	//TODO: Insert user into DB here
};

export default {
	seed,
	login,
	validateToken,
	register,
};
