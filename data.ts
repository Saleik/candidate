import bcrypt from 'bcrypt';

type Users = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}[];

interface IData {
	users: Users;
}

const data: IData = {
	users: [
		{
			firstname: 'Kevin',
			lastname: 'Loriot',
			email: 'ksarrazin.dev@gmail.com',
			password: bcrypt.hashSync('12345Admin^^', 10),
		},
		{
			firstname: 'Evelyne',
			lastname: 'Zubar',
			email: 'evelynezubar@gmail.com',
			password: bcrypt.hashSync('12345User^^', 10),
		},
	],
};

export default data;
