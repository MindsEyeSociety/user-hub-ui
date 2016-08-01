import { combineReducers } from 'redux';
import nav from './nav';
import profile from './profile';
import member from './member';
import office from './office';
import domain from './domain';

export default combineReducers({
	[ nav.NAME ]:     nav.reducer,
	[ profile.NAME ]: profile.reducer,
	[ member.NAME ]:  member.reducer,
	[ office.NAME ]:  office.reducer,
	[ domain.NAME ]:  domain.reducer
});
