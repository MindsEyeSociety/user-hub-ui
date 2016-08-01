import { Record, List, Map } from 'immutable';

export const Office = new Record({
	id: undefined,
	name: '',
	email: '',
	type: 'Primary',
	orgUnit: undefined,
	userID: undefined,
	parents: new List(),
	children: new List(),
	roles: new List(),
	didInvalidate: false,
	isFetching: false,
	lastUpdated: undefined
});

export const Offices = new Record({
	isFetching: false,
	didInvalidate: false,
	lastUpdated: undefined,
	current: null,
	items: new Map()
});

export default { Office, Offices };
