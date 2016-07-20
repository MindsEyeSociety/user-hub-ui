import { List, Map } from 'immutable';

const initialState = new List([
	new Map({ href: '/',       name: 'Profile' }),
	new Map({ href: '/domain', name: 'Domains' }),
	new Map({ href: '/member', name: 'Members' }),
	new Map({ href: '/office', name: 'Offices' })
]);

export default function( state = initialState, action ) {
	return state;
}
