import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import logging from './config/loggings';
import config from './config/config';

const NAMESPACE = 'Server';

const app = express();

/** Parse the request */
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

/** Logging the request */
app.use((req, res, next) => {
	logging.info(
		NAMESPACE,
		`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		logging.info(
			NAMESPACE,
			`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
		);
	});

	next();
});

/** Rules of our API */
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Header',
		'Origin, X-Requested-With, Content-Type'
	);

	if (req.method == 'OPtIONS') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');

		return res.status(200).json({});
	}
	next();
});

/** Routes */
/* app.get('/', (req, res) => {
	res.send('Server is ready !');
}); */

/** Error Handling */
app.use((req, res, next) => {
	const error = new Error('Not Found');

	return res.status(404).json({
		message: error.message,
	});
});

/** Create Server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
	logging.info(
		NAMESPACE,
		`Server running on ${config.server.hostname}:${config.server.port}`
	)
);
