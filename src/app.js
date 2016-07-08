import React from 'react';
import {render} from 'react-dom';
import {Nav} from './components/nav';
import {Profile} from './components/profile';

import './app.css';

const profile = {
	"id":8,
	"portalID":375,
	"firstName":"Ephraim",
	"lastName":"Gregor",
	"nickname":null,
	"address":null,
	"email":"ephraimgregor@gmail.com",
	"membershipType":"Full",
	"membershipNumber":"US2012030038",
	"membershipExpiration":"2017-09-05T00:00:00.000Z",
	"orgUnit":{
		"id":3,
		"name":"Children of the Lost Eden",
		"code":"NY-004",
		"type":"Domain"
	},
	"offices":[
		{
			"id":7,
			"name":"DC",
			"email":null,
			"type":"Primary",
			"parentOfficeID":null,
			"parentPath":"1.3.7",
			"parentOrgID":3,
			"userID":8,
			"roles":[
				"user_read_private",
				"user_update",
				"user_assign",
				"org_update",
				"office_update",
				"office_assign",
				"office_create_assistants"
			]
		}
	],
	"fullName":"Ephraim Gregor"
};

const navItems = [
	{ href: '/', name: 'Profile' },
	{ href: '/domain', name: 'Domains' },
	{ href: '/member', name: 'Members' },
	{ href: '/office', name: 'Offices' }
];

class App extends React.Component {
	render() {
		return (
			<div>
				<header>
					<Nav items={navItems} />
				</header>
				<Profile user={profile} />
			</div>
		);
	}
}

render( <App />, document.getElementById( 'app' ) );
