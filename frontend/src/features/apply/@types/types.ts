import { IError } from '../../types';

export type Applies = {
	corporation: string;
	email: string;
	position: string;
	techno: string;
	comment: string;
	city: string;
	createdAt: Date;
	reminder: Date;
};

//Get all applies
export interface GetApplies {
	applies: null | Applies[];
	isLoading: boolean;
	error: IError;
}
export interface AppliesData {
	data: Applies[];
}

//Add new apply
export interface RegisterState {
	isRegister: boolean;
	corporation: string | null;
	isLoading: boolean;
	error: IError;
}

export interface DataResponse {
	data: {
		corporation: string;
	};
}

export interface StoreData {
	dateOfRecall: Date;
	corporation: string;
	email: string;
	position: string;
	city: string;
	technologies: string;
	comment: string;
	userId: string;
}
