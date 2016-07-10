import { Record, List, Map } from 'immutable';

export const Member = new Record({
	id: undefined,
	firstName: '',
	lastName: '',
	fullName: '',
	'nickname': '',
	'address': undefined,
	'email': undefined,
	'membershipType': 'Full',
	'membershipNumber': '',
	'membershipExpiration': '',
	'orgUnit': undefined,
	'offices': new List()
});

export const Members = new Record({
	isFetching: false,
	didInvalidate: false,
	lastUpdated: undefined,
	items: new List()
});

export default { Member, Members };