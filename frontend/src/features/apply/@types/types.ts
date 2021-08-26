import { IError } from '../../types';

export type Applies = {
	_id: string;
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
export interface storeState {
	isStore: boolean;
	isLoading: boolean;
	error: IError;
}

export interface StoreData {
	[key: string]: string | string[];
}

//Delete Apply

export interface DelApply {
	success: boolean;
	isLoading: boolean;
	error: IError;
}
