import { Record, List, Map } from 'immutable';

const Profile = new Record({
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
	'orgUnit': new Record({
		'id': undefined,
		'name': '',
		'code': '',
		'type': 'Domain'
	}),
	'offices': new List()
});

export default Profile;
