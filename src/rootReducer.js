import { combineReducers } from 'redux';
import profile from './profile';

export default combineReducers({
	[ profile.NAME ]: profile.reducer
});
