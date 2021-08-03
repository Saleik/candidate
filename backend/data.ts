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
	techno: string;
	comment: string;
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
			techno: 'HTML5,CSS3,NodeJS,VueJS,Git,MongoDB',
			comment:
				'Everping est une start-up ipsum dolor sit amet consectetur, adipisicing elit. Accusantium eaque iste eos aliquam, consequuntur',
			city: 'Bordeaux',
			firstApply: new Date('2021-06-10'),
			revival: new Date('2021-06- 20'),
			lastRevival: new Date('2021-06-15'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
		{
			corporation: 'leProf',
			position: 'Junior Front-end Developer',
			techno: 'HTML5,CSS3,ReactJS,Bootstrap,Git',
			comment:
				'leProf est une société ipsum dolor sit amet consectetur, adipisicing elit. Accusantium eaque iste eos aliquam, consequuntur',
			city: 'Bordeaux',
			firstApply: new Date('2021-06-12'),
			revival: new Date('2021-06-22'),
			lastRevival: new Date('2021-06-18'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
		{
			corporation: 'Betomorrow',
			position: 'Junior Front-end Developer',
			techno: 'HTML5,CSS3,VueJS,MaterialUI,Git',
			comment:
				"Travailler chez Betomorrow c'est ipsum dolor sit amet consectetur, adipisicing elit. Accusantium eaque iste eos aliquam, consequuntur",
			city: 'Bordeaux',
			firstApply: new Date('2021-06-5'),
			revival: new Date('2021-06- 15'),
			lastRevival: new Date('2021-06-10'),
			userId: '60ce22f892d50a5e62e1e67a',
		},
	],
};

export default data;
