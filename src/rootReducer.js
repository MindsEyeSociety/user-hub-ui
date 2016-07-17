import { combineReducers } from 'redux';
import profile from './profile';
import member from './member';

export default combineReducers({
	[ profile.NAME ]: profile.reducer,
	[ member.NAME ]:  member.reducer
});
