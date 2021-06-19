import jwt from 'jsonwebtoken';

type User = {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
};

const generateJWT = (user: User) => {
	return jwt.sign(
		{
			_id: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		},
		process.env.JWT_SECRET as string,
		{
			expiresIn: process.env.JWT_EXPIRE,
		}
	);
};

export default generateJWT;
