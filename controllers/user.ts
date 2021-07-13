import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import User from '../models/user';
import generateJWT from '../middlewares/generateJWT';
import data from '../data';
import bcrypt, { hash } from 'bcrypt';

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

const signin = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Signin to app.`);

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

			return;
		}
	}
	res.status(401).send({
		message: 'invalid email or password',
	});
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Register user in db.`);

	const { firstname, lastname, email, password } = req.body;

	const user = new User({
		firstname: firstname,
		lastname: lastname,
		email: email,
		password: bcrypt.hashSync(password, 10),
	});

	const createdUser = await user.save();

	res.status(201).send({
		_id: createdUser._id,
		firstname: createdUser.firstname,
		lastname: createdUser.lastname,
		email: createdUser.email,
		token: generateJWT(createdUser),
	});
};

export default {
	seed,
	signin,
	validateToken,
	register,
};
