const getTimeStamps = (): string => {
	return new Date().toLocaleString();
};

const info = (namespace: string, message: string, object?: any) => {
	if (object) {
		console.log(`[${getTimeStamps()}][INFO][${namespace}]${message}`, object);
	} else {
		console.log(`[${getTimeStamps()}][INFO][${namespace}]${message}`);
	}
};

const warn = (namespace: string, message: string, object?: any) => {
	if (object) {
		console.warn(`[${getTimeStamps()}][WARN][${namespace}]${message}`, object);
	} else {
		console.warn(`[${getTimeStamps()}][WARN][${namespace}]${message}`);
	}
};

const error = (namespace: string, message: string, object?: any) => {
	if (object) {
		console.error(
			`[${getTimeStamps()}][ERROR][${namespace}]${message}`,
			object
		);
	} else {
		console.error(`[${getTimeStamps()}][ERROR][${namespace}]${message}`);
	}
};

const debug = (namespace: string, message: string, object?: any) => {
	if (object) {
		console.debug(
			`[${getTimeStamps()}][DEBUG][${namespace}]${message}`,
			object
		);
	} else {
		console.debug(`[${getTimeStamps()}][DEBUG][${namespace}]${message}`);
	}
};

export default {
	info,
	warn,
	error,
	debug,
};
