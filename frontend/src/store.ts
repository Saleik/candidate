import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userSigninReducer } from './reducers/userReducers';

const initialState = {
	userSignin: {
		userData: localStorage.getItem('userData')
			? JSON.parse(localStorage.getItem('userData')!)
			: null,
	},
};

const reducer = combineReducers({
	userSignin: userSigninReducer,
});

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
