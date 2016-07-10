import React from 'react';
import moment from 'moment';
import { profile as user } from '../data.js';

export default class Profile extends React.Component {
	render() {
		let expire = moment( user.membershipExpiration );

		let expires = expire.calendar();
		if ( expire.isBefore() ) {
			expires = <strong className='text-danger'>{ expires }</strong>;
		}

		let orgName = user.orgUnit.name + ' (' + user.orgUnit.code + ')';

		let officeMap = office => <li key={ office.id }><a href={ '/office/' + office.id }>{ office.name }</a></li>;

		return (
			<main id='app'>
				<h1>{ user.fullName }</h1>
				<h2 className='text-muted'>{ user.membershipNumber }</h2>
				<p>
					Information: <a href={ '/member/' + user.id + '/edit' } className='text-muted'>(edit)</a>
				</p>
				<ul>
					<li>
						Email: <a href={ 'mailto:' + user.email }>{ user.email }</a>
					</li>
					<li>
						Expires: { expires }
					</li>
					<li>
						Domain: <a href={ '/domain/' + user.orgUnit.code }>{ orgName }</a>
					</li>
				</ul>

				<p>Offices:</p>
				<ul>
					{ user.offices.map( officeMap ) }
				</ul>
			</main>
		);
	}
}
