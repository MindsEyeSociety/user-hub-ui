import { List, Map } from 'immutable';

const initialState = new List([
	{ href: '/',       name: 'Profile' },
	{ href: '/domain', name: 'Domains' },
	{ href: '/member', name: 'Members' },
	{ href: '/office', name: 'Offices' }
]);

export default function( state = initialState, action ) {
	return state;
}
