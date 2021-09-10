import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	keepAlive: true,
	poolSize: 50,
	autoIndex: false,
	retryWrites: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://localhost/candidate';

const MONGO = {
	host: MONGO_HOST,
	options: MONGO_OPTIONS,
	password: MONGO_PASSWORD,
	username: MONGO_USERNAME,
	url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const SERVER_PORT = process.env.PORT || 5000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_TOKEN_EXPIRE_TIME = process.env.JWT_EXPIRE;
const SERVER_TOKEN_SECRET = process.env.JWT_SECRET || 'coolIssuer';
const SERVER_TOKEN_ISSUER = process.env.JWT_ISSUER || 'superencryptedsecret';

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	token: {
		expireTime: SERVER_TOKEN_EXPIRE_TIME,
		secret: SERVER_TOKEN_SECRET,
		issuer: SERVER_TOKEN_ISSUER,
	},
};

const config = {
	server: SERVER,
	database: MONGO,
};

export default config;
