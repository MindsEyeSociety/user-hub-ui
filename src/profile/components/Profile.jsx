import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Profile extends Component {
	render() {
		let profile = this.props.profile;
		let expire = moment( profile.membershipExpiration );

		let expires = expire.calendar();
		if ( expire.isBefore() ) {
			expires = <strong className='text-danger'>{ expires }</strong>;
		}

		let orgLink = <em>None</em>;
		if ( profile.orgUnit ) {
			orgLink = <Link to={ '/domain/' + profile.orgUnit.code }>{ profile.orgUnit.name + ' (' + profile.orgUnit.code + ')' }</Link>;
		}

		let officeMap = office => <li key={ office.id }><Link to={ '/office/' + office.id }>{ office.name }</Link></li>;

		return (
			<main id='app'>
				<h1>{ profile.fullName }</h1>
				<h2 className='text-muted'>{ profile.membershipNumber }</h2>
				<p>
					Information: <a href={ '/member/' + profile.id + '/edit' } className='text-muted'>(edit)</a>
				</p>
				<ul>
					<li>
						Email: <a href={ 'mailto:' + profile.email }>{ profile.email }</a>
					</li>
					<li>
						Expires: { expires }
					</li>
					<li>
						Domain: { orgLink }
					</li>
				</ul>

				<p>Offices:</p>
				<ul>
					{ profile.offices.map( officeMap ) }
				</ul>
			</main>
		);
	}
}
