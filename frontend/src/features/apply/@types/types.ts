import { IError } from '../../types';

export type Apply = {
	_id: string;
	corporation: string;
	email: string;
	position: string;
	techno: string;
	comment: string;
	city: string;
	createdAt?: Date;
	reminder?: Date;
};

//Get all applies
export interface GetApplies {
	applies: null | Apply[];
	isLoading: boolean;
	error: IError;
}

export interface AppliesData {
	data: Apply[];
}
//Get apply by ID
export interface GetApply {
	apply: Apply | null;
	isLoading: boolean;
	error: IError;
}
export interface ApplyData {
	data: Apply;
}
//Add new apply
export interface storeState {
	isStore: boolean;
	isLoading: boolean;
	error: IError;
}

//Edit Apply
export interface EditApply {
	isEdit: boolean;
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
