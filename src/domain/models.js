import { Record, List, Map } from 'immutable';

export const Domain = new Record({
	id: undefined,
	name: '',
	code: '',
	type: '',
	location: undefined,
	website: undefined,
	defDoc: undefined,
	users: new List(),
	offices: new List(),
	children: new List(),
	parents: new List(),
	portalID: undefined,
	didInvalidate: false,
	isFetching: false,
	lastUpdated: undefined
});

export const Domains = new Record({
	isFetching: false,
	didInvalidate: false,
	lastUpdated: undefined,
	items: new Map()
});

export default { Domain, Domains };
