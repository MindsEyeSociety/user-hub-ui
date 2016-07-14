import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Member extends React.Component {
	render() {
		let member = this.props.member;

		let editLink = '';
		if ( true ) {
			editLink = <Link to={ '/member/' + member.id + '/edit' } className='text-muted'>(edit)</Link>;
		}

		let expire = moment( member.membershipExpiration );

		let expires = expire.calendar();
		if ( expire.isBefore() ) {
			expires = <strong className='text-danger'>{ expires }</strong>;
		}

		let orgLink = <em>None</em>;
		if ( member.orgUnit ) {
			orgLink = <Link to={ '/domain/' + member.orgUnit.code }>{ member.orgUnit.name + ' (' + member.orgUnit.code + ')' }</Link>;
		}

		let email = '';
		if ( member.email ) {
			email = <li>Email: <a href={ 'mailto:' + member.email }>{ member.email }</a></li>;
		}

		return (
			<main id='app'>
				<h1>{ member.fullName }</h1>
				<h2 className='text-muted'>{ member.membershipNumber }</h2>
				<p>
					Information: { editLink }
				</p>
				<ul>
					{ email }
					<li>
						Expires: { expires }
					</li>
					<li>
						Domain: { orgLink }
					</li>
				</ul>
			</main>
		);
	}
}
