import bcrypt from 'bcrypt';

type Users = {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}[];

type Applies = {
	corporation: string;
	position: string;
	city: string;
	firstApply: Date;
	revival: Date;
	lastRevival: Date;
	userId: string;
}[];

interface IData {
	users: Users;
	applies: Applies;
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
	applies: [
		{
			corporation: 'Everping',
			position: 'Junior Full-Stack Developer',
			city: 'Bordeaux',
			firstApply: new Date('2021-06-10'),
			revival: new Date('2021-06- 20'),
			lastRevival: new Date('2021-06-15'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
		{
			corporation: 'leProf',
			position: 'Junior Front-end Developer',
			city: 'Bordeaux',
			firstApply: new Date('2021-06-12'),
			revival: new Date('2021-06- 22'),
			lastRevival: new Date('2021-06-18'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
		{
			corporation: 'Betomorrow',
			position: 'Junior Front-end Developer',
			city: 'Bordeaux',
			firstApply: new Date('2021-06-5'),
			revival: new Date('2021-06- 15'),
			lastRevival: new Date('2021-06-10'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
	],
};

export default data;
