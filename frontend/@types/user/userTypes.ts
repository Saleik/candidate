export type Data = {
	_id: string;
	firstname: string;
	lastname: string;
	email: string;
	token: string;
};

export interface IData {
	data: Data;
}
