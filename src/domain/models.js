import { Record, List, Map } from 'immutable';

export const Domain = new Record({
	id: undefined,
	name: '',
	code: '',
	type: '',
	location: undefined,
	website: undefined,
	defDoc: undefined,
	members: new List(),
	offices: new List(),
	children: new List(),
	parents: new List(),
	venueType: undefined,
	didInvalidate: false,
	isFetching: false,
	lastUpdated: undefined
});

export const Domains = new Record({
	isFetching: false,
	didInvalidate: false,
	lastUpdated: undefined,
	current: null,
	items: new Map()
});

export default { Domain, Domains };
