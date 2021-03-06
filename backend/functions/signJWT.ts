import jwt from 'jsonwebtoken';
import logging from '../config/logging';
import config from '../config/config';
import IUser from '../@types/user';

const NAMESPACE = 'Auth';

const signJWT = (
	user: IUser,
	callback: (error: Error | null, token: string | null) => void
): void => {
	let timeSinchEpoch = new Date().getTime();
	let expirationTime =
		timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
	let expirationTimeInSeconds = Math.floor(expirationTime / 1000);

	logging.info(NAMESPACE, `Attempting to sign token for ${user.firstname}`);

	try {
		jwt.sign(
			{
				username: user.firstname,
			},
			config.server.token.secret,
			{
				issuer: config.server.token.issuer,
				algorithm: 'HS256',
				expiresIn: expirationTimeInSeconds,
			},
			(error, token) => {
				if (error) {
					callback(error, null);
				} else if (token) {
					callback(null, token);
				}
			}
		);
	} catch (error: any) {
		logging.error(NAMESPACE, error.message, error);
		callback(error, null);
	}
};

export default signJWT;
