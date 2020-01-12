import { combineReducers } from 'redux';
import appReducer from './reducers/app.reducer';

const rootReducer = combineReducers({
	app: appReducer
});

export default rootReducer;
