import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logging from 'config/logging';
import config from 'config/config';
const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
	logging.info(NAMESPACE, 'Validating Token');

	const token = req.headers.authorization?.split(' ')[1]; //bearer XXXXX

	if (token) {
		jwt.verify(token, config.server.token.secret, (err, decoded) => {
			if (err) {
				res.status(404).send({
					message: err.message,
					error: err,
				});
			} else {
				res.locals.jwt = decoded;
				next();
			}
		});
	} else {
		res.status(401).send({
			message: 'Unauthorized',
		});
	}
};

export default extractJWT;
