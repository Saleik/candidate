import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import User from '../models/user';
import data from '../data';
import { hashSync, compareSync } from 'bcrypt';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'User';

const seed = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Users seed to db.');
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
	}).catch((err: { message: string }) => console.log('Caught:', err.message));

	if (user)
		if (compareSync(req.body.password, user.password))
			signJWT(user, (_error, token) => {
				if (_error)
					return res.status(500).json({
						message: _error.message,
						error: _error,
					});
				else if (token)
					return res.status(200).json({
						_id: user._id,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						token: token,
					});
			});
		else
			return res.status(401).json({
				message: 'Invalid password or email.',
			});
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, `Register user in db.`);

	const { firstname, lastname, email, password } = req.body;

	const user = new User({
		firstname: firstname.toString(),
		lastname: lastname.toString(),
		email: email.toString(),
		password: hashSync(password, 10),
	});

	const createdUser = await user.save();

	signJWT(user, (_error, token) => {
		if (_error)
			return res.status(500).json({
				message: _error.message,
				error: _error,
			});
		else if (token)
			return res.status(200).json({
				_id: createdUser._id,
				firstname: createdUser.firstname,
				lastname: createdUser.lastname,
				email: createdUser.email,
				token: token,
			});
	});
};

export default {
	seed,
	signin,
	validateToken,
	register,
};
